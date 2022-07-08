import icon from "./icon.png";
import "./home.css";

export default function App() {
         return (
                  <header>
                           <div className="container-fluid w-full h-full items-center text-center home-container">
                                    <img src={icon} alt="logo" className="image"/>
                                    <h1 className="title">AHQ Softwares</h1>
                                    <h6>A developer racing to be a full stacked dev</h6>
                           </div>
                  </header>
         )
}