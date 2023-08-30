import "../style.css"
import image from'../images/image.jpg';

export default function ContactUsComp()
{
    return(

        <div >
			
        <div >
        <img className="" src={image} alt="Hospital" width="100%"/>
            </div>
        <div className="contactus " >
          
         <div className="contact">
                <h3>LifeLine Hospital </h3><br/>
                Near Deccan Gymkhana,<br/>
                Deccan, Pune 411004,<br/>
                Tel. +91 20 4017 2001 / 204937<br/>
                Fax. (+91) 20 2679 1107<br/>
                Email: lifeline@hospital.org<br/>
        </div>
        </div>
        </div> 
    )
}