import FoodIcon from "../assets/foodIcon.svg?react";
import DrinksIcon from "../assets/drinksIcon.svg?react";
import InfoIcon from "../assets/infoIcon.svg?react";
import MerchIcon from "../assets/merchIcon.svg?react";
import CampingIcon from "../assets/campingIcon.svg?react";
import CommunityCampIcon from "../assets/communityCampingIcon.svg?react";
import FirstAidIcon from "../assets/firstAidIcon.svg?react";
import SpecialCampIcon from "../assets/specialCampingIcon.svg?react";
import FestivalSiteIcon from "../assets/festivalSiteIcon.svg?react";
import RechargeIcon from "../assets/rechargeZoneIcon.svg?react";
import RentGearIcon from "../assets/rentYourGearIcon.svg?react";
import ToiletIcon from "../assets/toiletsIcon.svg?react";
import OpenHandIcon from "../assets/openHand.svg?react";
import ClosedHandIcon from "../assets/closedHand.svg?react";

export default function BottomBar({ currentView }) {
  return (
    <div className="bottomBar">
      <div className="bottomBarLeft">
        <div>
          <h2>
            <span>Roskilde</span>
            <span>Festival</span>
            <span>2027</span>
          </h2>
        </div>
        <div className="icons">
          {currentView === "map" ? <MapIcons /> : <FestivalIcons />}
        </div>
      </div>
      <div className="bottomBarRight">
        <div className="handInstruction">
          <OpenHandIcon />
          <strong>Hover over areas to explore them</strong>
        </div>

        <span className="handInstructionDivider"></span>

        <div className="handInstruction">
          <ClosedHandIcon />
          <strong>Close + open hand to lock and unlock</strong>
        </div>
      </div>
    </div>
  );
}

function FestivalIcons() {
  return (
    <>
      <div className="iconColumn">
        <div className="iconInfo">
          <FoodIcon />
          <span>Food</span>
        </div>
        <div className="iconInfo">
          <DrinksIcon />
          <span>Drinks</span>
        </div>
        <div className="iconInfo">
          <MerchIcon />
          <span>Merch</span>
        </div>
      </div>
      <div className="iconColumn">
        <div className="iconInfo">
          <ToiletIcon />
          <span>Toilets</span>
        </div>
        <div className="iconInfo">
          <FirstAidIcon />
          <span>First Aid</span>
        </div>
        <div className="iconInfo">
          <InfoIcon />
          <span>Info</span>
        </div>
      </div>
    </>
  );
}

function MapIcons() {
  return (
    <>
      <div className="iconColumn">
        <div className="iconInfo">
          <CampingIcon />
          <span>Camping</span>
        </div>
        <div className="iconInfo">
          <CommunityCampIcon />
          <span>Community camping</span>
        </div>
        <div className="iconInfo">
          <SpecialCampIcon />
          <span>Special camping</span>
        </div>
      </div>
      <div className="iconColumn">
        <div className="iconInfo">
          <FestivalSiteIcon />
          <span>Festival Site</span>
        </div>
        <div className="iconInfo">
          <RechargeIcon />
          <span>Recharge Zone</span>
        </div>
        <div className="iconInfo">
          <RentGearIcon />
          <span>Rent your gear</span>
        </div>
      </div>
    </>
  );
}
