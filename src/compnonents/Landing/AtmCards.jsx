import React from "react";
import Vesa from "../Images/Visaatm.png";
import MasterCard from "../Images/mastercardatm.png";
import Rupycard from "../Images/rupyatm.png";
import Back from "../Images/atmback.png";
import "./AtmCards.css";

export default function AtmCards() {
  return (
    <div>
       <h1 className="sub-hed-card">Cards Available Here</h1>
      <div>
        <div class="card-group">
          <article class="acard">
            <div class="product-image">
              <img src={Vesa} alt="" />
            </div>
          </article>
          <article class="acard">
            <div class="product-image">
              <img src={MasterCard} alt="" />
            </div>
          </article>
          <article class="acard">
            <div class="product-image">
              <img src={Rupycard} alt="" />
            </div>
          </article>
          <article class="acard">
            <div class="product-image">
              <img src={Back} alt="" />
            </div>
          </article>
          
        </div>
      </div>
    </div>
  );
}
