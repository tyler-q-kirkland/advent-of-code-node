import * as utils from "../../utils/utils.js";
import Graph from "./graph.js";


let map = new Graph();
map.addNode("Fullstack");
map.addNode("Starbucks");
map.addNode("Dubliner");
map.addNode("Insomnia Cookies");
map.addNode("Cafe Grumpy");
map.addNode("Dig Inn");
map.addEdge("Fullstack", "Starbucks", 6);
map.addEdge("Fullstack", "Dig Inn", 7);
map.addEdge("Fullstack", "Dubliner", 2);
map.addEdge("Starbucks", "Dubliner", 3);
map.addEdge("Starbucks", "Insomnia Cookies", 6);
map.addEdge("Insomnia Cookies", "Dubliner", 7);
map.addEdge("Insomnia Cookies", "Cafe Grumpy", 5);
map.addEdge("Cafe Grumpy", "Dig Inn", 9);
map.addEdge("Dubliner", "Dig Inn", 4);

console.log(map.findPathWithDijkstra("Fullstack", "Cafe Grumpy"));

utils.logOutput("2024", "16", "A", 'not yet');
