import express from 'express';
import handleRedirect from "../utils/renderRedirectUrl";

const router = express.Router();


// web route

//landing page
router.get('/', (req, res) => {
    const data = {};

    res.render('index',{data});
});


// swagger documentation
router.get('/documentation', (req, res) => {
    res.render('swagger');
});

// login
router.get('/login', (req, res) => {
    res.render('login');
});
  
// signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

  
// dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


  
  

// the short link query params
router.get('/:short_code', async (req, res)  => {
    return await handleRedirect(req, res);//point to the handler to redirect the user to the original url 
});

  

router.post('/endpoint', (req, res) => {
    const responseData = {
        message: 'Data received successfully!',
        data: req.body // You can send back the received data if needed
    };
    return res.json(responseData);
});




export default router;
