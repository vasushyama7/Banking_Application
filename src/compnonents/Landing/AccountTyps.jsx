import React, { useEffect, useRef } from "react";
import "./AccountTypes.css";
import BS from "../Images/Businessbank.png";
import PS from "../Images/persnolbanking.png";

export default function Services() {
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const carouselsRef = useRef(null);
  const listRef = useRef(null);
  const seeMoreButtonsRef = useRef([]);
  const backButtonRef = useRef(null);

  useEffect(() => {
    const nextButton = nextButtonRef.current;
    const prevButton = prevButtonRef.current;
    const carousels = carouselsRef.current;
    const listHTML = listRef.current;
    const seeMoreButtons = seeMoreButtonsRef.current;
    const backButton = backButtonRef.current;

    const showSlider = (type) => {
      nextButton.style.pointerEvents = "none";
      prevButton.style.pointerEvents = "none";

      carousels.classList.remove("next", "prev");
      const items = document.querySelectorAll(".carousels .list .item");
      if (type === "next") {
        listHTML.appendChild(items[0]);
        carousels.classList.add("next");
      } else {
        listHTML.prepend(items[items.length - 1]);
        carousels.classList.add("prev");
      }
      setTimeout(() => {
        nextButton.style.pointerEvents = "auto";
        prevButton.style.pointerEvents = "auto";
      }, 2000);
    };

    nextButton.onclick = () => showSlider("next");
    prevButton.onclick = () => showSlider("prev");

    seeMoreButtons.forEach((button) => {
      button.onclick = () => {
        carousels.classList.remove("next", "prev");
        carousels.classList.add("showDetail");
      };
    });

    backButton.onclick = () => {
      carousels.classList.remove("showDetail");
    };
  }, []);

  return (
    <div className="carousels" ref={carouselsRef}>
      <div className="list" ref={listRef}>
        <div className="item">
          <img src={PS} alt="Personal Banking" />
          <div className="introduce">
            <div className="title">Personal</div>
            <div className="topic">Banking</div>
            <div className="des">
              Personal banking encompasses a range of services provided by
              financial institutions tailored to individual customers. Key
              offerings include savings and checking accounts, personal loans,
              mortgages, credit and debit cards, and investment options.
            </div>
            <button
              className="seeMore"
              ref={(el) => seeMoreButtonsRef.current.push(el)}
            >
              SEE MORE &#8599;
            </button>
          </div>
          <div className="detail">
            <div className="title">Personal Banking</div>
            <div className="des">
              Personal banking encompasses a range of services provided by
              financial institutions tailored to individual customers. Key
              offerings include savings and checking accounts, personal loans,
              mortgages, credit and debit cards, and investment options.
              Personal banking aims to manage day-to-day financial needs,
              provide secure storage for money, and facilitate transactions.
              Additionally, online and mobile banking services enable convenient
              account management and bill payments. Personalized customer
              service, competitive interest rates, and diverse financial
              products are critical components, ensuring customers can
              efficiently manage their finances and achieve their
              financial goals.{" "}
            </div>
            <div className="specifications">
              <div>
                <p>Used Time</p>
                <p>24 X 7</p>
              </div>
              <div>
                <p>Online Banking</p>
                <p>Available</p>
              </div>
              <div>
                <p>Compatible</p>
                <p>Android,IOS</p>
              </div>
              <div>
                <p>Cards</p>
                <p>Cridt/Debit</p>
              </div>
              <div>
                <p>Controlled</p>
                <p>Safe & Sequre</p>
              </div>
            </div>
            <div className="checkout">
              <button>Create Account</button>
              <button>Know More</button>
            </div>
          </div>
        </div>

        <div className="item">
          <img src={BS} alt="Business Banking" />
          <div className="introduce">
            <div className="title">Business</div>
            <div className="topic">Banking</div>
            <div className="des">
              Business banking offers specialized financial services tailored
              for companies of all sizes. Key features include business checking
              and savings accounts, commercial loans, lines of credit, and
              treasury management services.
            </div>
            <button
              className="seeMore"
              ref={(el) => seeMoreButtonsRef.current.push(el)}
            >
              SEE MORE &#8599;
            </button>
          </div>
          <div className="detail">
            <div className="title">Business Banking</div>
            <div className="des">
              Business banking offers specialized financial services tailored
              for companies of all sizes. Key features include business checking
              and savings accounts, commercial loans, lines of credit, and
              treasury management services. It provides advanced solutions like
              merchant services for seamless payment processing, cash flow
              management tools, and dedicated account managers for personalized
              support. Enhanced security protocols ensure safe transactions,
              while integrated accounting software simplifies financial
              tracking. Business banking also facilitates international trade
              with foreign exchange services and global payment solutions. With
              innovative digital platforms, businesses can manage their finances
              efficiently, optimize liquidity, and drive growth in a
              competitive market.{" "}
            </div>
            <div className="specifications">
              <div>
                <p>Used Time</p>
                <p>24 X 7</p>
              </div>
              <div>
                <p>Online Banking</p>
                <p>Available</p>
              </div>
              <div>
                <p>Compatible</p>
                <p>Android,IOS</p>
              </div>
              <div>
                <p>Cards</p>
                <p>Cridt/Debit</p>
              </div>
              <div>
                <p>Controlled</p>
                <p>Safe&Sequre</p>
              </div>
            </div>
            <div className="checkout">
              <button>Create Account</button>
              <button>Know More</button>
            </div>
          </div>
        </div>

        <div className="item">
          <img src={PS} alt="Business Banking" />
          <div className="introduce">
            <div className="title">International</div>
            <div className="topic">Banking</div>
            <div className="des">
              International banking offers comprehensive financial services for
              global transactions and cross-border activities. Key features
              include multi-currency accounts, international wire transfers, and
              trade finance services such as letters of credit and export
              financing
            </div>
            <button
              className="seeMore"
              ref={(el) => seeMoreButtonsRef.current.push(el)}
            >
              SEE MORE &#8599;
            </button>
          </div>
          <div className="detail">
            <div className="title">International Banking</div>
            <div className="des">
              International banking offers comprehensive financial services for
              global transactions and cross-border activities. Key features
              include multi-currency accounts, international wire transfers, and
              trade finance services such as letters of credit and export
              financing. Advanced foreign exchange solutions and hedging options
              mitigate currency risk. Secure digital platforms enable 24/7
              global account management, while compliance with international
              regulations ensures smooth operations. Personalized advisory
              services support global investments and wealth management.
              Additionally, international banking provides access to global
              markets and facilitates international business expansion with
              specialized corporate banking solutions. Its robust infrastructure
              and cutting-edge technology drive seamless and efficient global
              financial management.{" "}
            </div>
            <div className="specifications">
              <div>
                <p>Used Time</p>
                <p>24 X 7</p>
              </div>
              <div>
                <p>Online Banking</p>
                <p>Available</p>
              </div>
              <div>
                <p>Compatible</p>
                <p>Android,IOS</p>
              </div>
              <div>
                <p>Cards</p>
                <p>Cridt/Debit</p>
              </div>
              <div>
                <p>Controlled</p>
                <p>Safe&Sequre</p>
              </div>
            </div>
            <div className="checkout">
              <button>Create Account</button>
              <button>Know More</button>
            </div>
          </div>
        </div>

        <div className="item">
          <img src={BS} alt="Business Banking" />
          <div className="introduce">
            <div className="title">DIGITAL</div>
            <div className="topic">Banking</div>
            <div className="des">
              DIGITAL BANKING:Digital banking revolutionizes financial services
              by offering comprehensive online and mobile solutions. Key
              features include 24/7 account access, real-time transactions,
              seamless fund transfers, and instant bill payments.
            </div>
            <button
              className="seeMore"
              ref={(el) => seeMoreButtonsRef.current.push(el)}
            >
              SEE MORE &#8599;
            </button>
          </div>
          <div className="detail">
            <div className="title">DIGITAL Banking</div>
            <div className="des">
              DIGITAL BANKING:Digital banking revolutionizes financial services
              by offering comprehensive online and mobile solutions. Key
              features include 24/7 account access, real-time transactions,
              seamless fund transfers, and instant bill payments. Advanced
              security measures such as biometric authentication and encryption
              ensure data protection. Personalized financial management tools,
              AI-driven insights, and automated savings plans enhance user
              experience. Integration with digital wallets and contactless
              payments adds convenience. Additionally, digital banking supports
              cryptocurrency transactions and peer-to-peer payments, catering to
              modern financial needs. Its eco-friendly approach reduces paper
              use, contributing to sustainability. Overall, digital banking
              provides a dynamic, secure, and efficient way to manage finances.{" "}
            </div>
            <div className="specifications">
              <div>
                <p>Used Time</p>
                <p>24 X 7</p>
              </div>
              <div>
                <p>Online Banking</p>
                <p>Available</p>
              </div>
              <div>
                <p>Compatible</p>
                <p>Android,IOS</p>
              </div>
              <div>
                <p>Cards</p>
                <p>Cridt/Debit</p>
              </div>
              <div>
                <p>Controlled</p>
                <p>Safe&Sequre</p>
              </div>
            </div>
            <div className="checkout">
              <button>Create Account</button>
              <button>Know More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="arrows">
        <button id="prev" ref={prevButtonRef}>
          &lt;
        </button>
        <button id="next" ref={nextButtonRef}>
          &gt;
        </button>
        <button id="back" className="all" ref={backButtonRef}>
          See All &#8599;
        </button>
      </div>
    </div>
  );
}
