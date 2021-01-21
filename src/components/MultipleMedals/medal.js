import React from 'react';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Modal from "../Modal/modal";

const useStyles = makeStyles(styles);
const Medals = () => {
    const classes = useStyles();

    const query = `
PREFIX nobel: <http://data.nobelprize.org/terms/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT (COUNT (DISTINCT ?value) AS ?total) ?label 
        WHERE { 
        ?resource <http://data.nobelprize.org/terms/nobelPrize> ?value .
        ?resource rdfs:label ?label .
        }
        GROUP BY ?label 
        HAVING(?total > 1)
        ORDER BY DESC(?total)
    `;

    const queryUrl = 'http://data.nobelprize.org/sparql?query=' + encodeURIComponent(query) + '&format=json';
    let [multi, setMulti] = React.useState([])
    let [curr, setCurr] = React.useState(0)
    React.useEffect(() => {
        axios.get(queryUrl)
            .then(res => {
                console.log("medal")
                const data = res.data.results.bindings;
                var aa = [];
                data.forEach(a => {
                    aa.push({name: a.label.value, count: a.total.value})
                })
                setMulti(aa)

            })
            .catch(err => {
                console.log(err);
            })
    }, [queryUrl]);

    function changeCurr() {

        setCurr(curr === multi.length - 1 ? 0 : curr + 1);
    }

    const [showModal, setShowModal] = React.useState(false);


    return (
        <>
            <GridItem xs={12} sm={12} md={4}>
                {multi.length !== 0 &&
                <Card chart>
                    <CardHeader color="success" onClick={() => setShowModal(true)}>
                        <h4 className={classes.cardTitleWhite} style={{ftext: "center"}}>Laureates with multiple
                            awards</h4>
                        <p className={classes.cardCategoryWhite}>

                        </p>
                    </CardHeader>
                    <CardBody onClick={() => setShowModal(true)}>
                        <h4 className={classes.cardTitleWhite}
                            style={{ftext: "center", color: "#063200", fontSize: "20px", padding: "10px"}}>
                            <p className="center">
                                {multi[curr].name}
                            </p>
                            <p></p>
                        </h4>

                    </CardBody>

                    <CardFooter chart>
                        <div className={classes.stats} style={{display: "block", padding: "10px", margin: " 0 35%"}}>
                            <div className="quiz-medal">
                                <div className="quiz-medal__circle quiz-medal__circle--gold">
                            <span>
                              {multi[curr].count}
                            </span>
                                </div>
                                <div className="quiz-medal__ribbon quiz-medal__ribbon--left"></div>
                                <div className="quiz-medal__ribbon quiz-medal__ribbon--right"></div>
                            </div>
                        </div>
                        <div className="icon" onClick={changeCurr}>
                            <div className="arrow"></div>
                        </div>
                    </CardFooter>
                </Card>
                }
            </GridItem>
            <Modal query={query} showModal={showModal} setShowModal={setShowModal}/>

        </>
    )
}

export default Medals;