import CarStatsPic from "../pics/carstats.jpg"
import ComparePic from "../pics/carCompare.jpg"
import RankingPic from "../pics/ranking.png"
import AbouPic from "../pics/about.jpg";
import {v4 as uuidv4} from 'uuid';

const HomePicData = [
    {
        id:uuidv4(),
        "image": CarStatsPic,
        "icon":'FcStatistics',
        "alt": "Car Stats Picture",
        "title": "Car Stats",
        "Attention": "Need to Double Check on Some Specs?",
        "description":"Search for your desired vehicle and get back dozens of vehicle Specs to help you choose your future whip",
        "route":"./carstats"
    },
    {
        id:uuidv4(),
        "image": ComparePic,
        "icon":'GoGitCompare',
        "alt": "Car Compare Picture",
        "title": "Compare",
        "Attention": "Stuck Between two Choices?",
        "description":"No Problem, Use Our Compare Service to compare two vehicles head to head to see which one best fiits your needs",
        "route":"./compare"
    },
    {
        id:uuidv4(),
        "image": RankingPic,
        "icon":'GiRank1',
        "alt": "Car Ranking Picture",
        "title": "Vehicle Rankings",
        "Attention": "Best Fuel Economy? Most HorsePower?",
        "description":"Use The Ranking Page to Find out the Best Rated Vehicles for your most desired Specs",
        "route":"./rankings"
    },
    {
        id:uuidv4(),
        "image": AbouPic,
        "icon":'FcAbout',
        "alt": "About Picture",
        "title": "About Us",
        "Attention": "Want to Know more About The Page",
        "description":"Visit the About Page to learn more about the Page's Services, Tools, and Inspirations",
        "route":"./about"
    }
]
export default HomePicData;