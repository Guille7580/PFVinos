const router = require('express').Router();
const mercadopago = require('mercadopago');
require('dotenv').config()

mercadopago.configure({
    access_token: process.env.DEV_ACCESS_TOKEN
})
//----> DEV_ACCESS_TOKEN = TEST-6493413234713799-032915-ecbe1d24b7ba19bc2819dcaa33ef00ee-535186645


router.post('/mercadoPago', async (req, res, next) => {

    try {
        const { email, items } = req.body
        const items_ml = items.map(i => ({
            title: i.title,
            unit_price: i.price,
            quantity: i.quantity,
        }))
        console.log(items_ml)
        let preference = {
            items: items_ml,
            external_reference: email,
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: "atm"
                    }
                ],
                installments: 3  //Cantidad máximo de cuotas
            },
            back_urls: {
                success: 'http://localhost:3001/mercadopago/pagos',
                failure: 'http://localhost:3001/mercadopago/pagos',
                pending: 'http://localhost:3001/mercadopago/pagos',
            },
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                console.info('respondio')
                //Este valor reemplazará el string"<%= global.id %>" en tu HTML
                global.id = response.body.id;
                console.log("response.body    :", response.body)
                global.init_point = response.body.sandbox_init_point;
                //console.log(response.body);
                res.json({ id: global.id, url: global.init_point }); 

            })
            .catch(function (error) {
                console.log(error);
            })

            
    } catch (error) {
        next(error)
    }
})

router.post('/mercadoPago/pagos', async (req, res, next) => {
    try {
      console.info("EN LA RUTA PAGOS ", req)
      const payment_id= req.query.payment_id
      const payment_status= req.query.status
      const external_reference = req.query.external_reference
      const merchant_order_id= req.query.merchant_order_id
      const email= req.query.email
      // const items = req.query.items
      const status = req.query.status
     
    
      //Aquí edito el status de mi orden
      Payment.create({
            payment_id: payment_id,
            payment_status: payment_status,
            merchant_order_id : merchant_order_id,
            status : status,
            email: email,
            cartId: external_reference,
            total:Total,
            detail:JSON.stringify(detail),
        })
    
    
    
        return res.redirect("http://localhost:3000")
        
    //     .catch((err) =>{
    //       console.error('error al salvar', err)
    //       return res.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`)
    //     })
    //   })
    //   .catch(err =>{
    //     console.error('error al buscar', err)
    //     return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
    //   })
    
      //proceso los datos del pago 
      //redirijo de nuevo a react con mensaje de exito, falla o pendiente
   
    } catch (error) {
      console.log("error  :",error)
      res.sendStatus(404)
    }
  })

module.exports = router;