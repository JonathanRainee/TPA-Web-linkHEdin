package service

import( 
	"fmt"
	"gopkg.in/gomail.v2"
)

func sendActivationMail(email string, link string){
	mail := gomail.NewMessage()

	mail.SetHeader("From", "jonthan.wiranata@binus.ac.id")
	mail.SetHeader("To", email)
	mail.SetHeader("Subject", "Your LinkHEdin account activation email")
	mail.SetBody("text/html", "To activate your LinkHEdin account, please click the following link: "+link)

	dial := gomail.NewDialer("smtp.gmail.com", 587, "linkhedin.jr@gmail.com", "wugwcknzxnajvcgz")
	err := dial.DialAndSend(mail)

	if err != nil {
		fmt.Println(err)
		panic(err)
	}
}

func sendForgetLink(email string, link string){
	mail := gomail.NewMessage()

	mail.SetHeader("From", "jonthan.wiranata@binus.ac.id")
	mail.SetHeader("To", email)
	mail.SetHeader("Subject", "Your LinkHEdin reset password email")
	mail.SetBody("text/html", "To reset your LinkHEdin password, please click the following link: "+link)

	dial := gomail.NewDialer("smtp.gmail.com", 587, "linkhedin.jr@gmail.com", "wugwcknzxnajvcgz")
	err := dial.DialAndSend(mail)

	if err != nil {
		fmt.Println(err)
		panic(err)
	}
}