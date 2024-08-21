import { Component} from 'react'
import "../../input.css"
class ContactUs extends Component<any,any>{  
    render(){
        return(
            <>
                <body>
                    <header>
                        <div className="container-auto">
                            <h1 className="text-3xl font-bold">Contact Us</h1>
                        </div>
                    </header>
                    <main className="container-auto p-6">
                        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                           
                                <div className="mb-4">
                                    <label htmlFor="name" className="label">Full Name</label>
                                    <input type="text" id="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="John Doe" />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="email" className="label">Email Address</label>
                                    <input type="email" id="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="you@example.com" />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="subject" className="label">Subject</label>
                                    <input type="text" id="subject" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Subject" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="message" className="label">Message</label>
                                    <textarea id="message" rows={5} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your message..."></textarea>
                                </div>
                                <button type="submit" className="btn-contactus">Send Message</button>
                     
                        </div>
                    </main>
                    <footer>
                        <div className="container-auto text-center">
                            <p>&copy; 2024 Vision Infotech. All rights reserved.</p>
                        </div>
                    </footer>
                </body>
            </>
        )
    }
}

export default ContactUs;
