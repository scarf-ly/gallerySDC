import http from "k6/http";
import { check,sleep } from "k6";


export default function() {
    let restaurant = Math.ceil(Math.random()*10000000);
    let params =  { headers: { "Content-Type": "application/json" } }
    let payload = JSON.stringify({ data: ['https://scarfly.s3-us-west-1.amazonaws.com/food/554.png','incidunt amet dolore',294,restaurant,'2017-01-10']});
    http.get(`http://localhost:3000/${restaurant}/gallery`);
    http.get(`http://localhost:3000/${restaurant}/gallery/${imageID}/${userID}`);
    // http.post(`http://localhost:3000/${restaurant}/gallery`, payload, params);
    
};

