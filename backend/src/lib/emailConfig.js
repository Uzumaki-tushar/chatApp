
import {response} from 'express';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service:"gmail",
  secure:true,
  port: 465,
  auth:{
    user:"tushar2471.be22@chitkara.edu.in",
    pass:"ugcq gqdh okdp picc"
  }
});



