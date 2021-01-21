import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import LitCoin from "../../components/Coins/LiteratureCoin";
import PCoin from "../../components/Coins/PeaceeCoin";
import EcoCoin from "../../components/Coins/EcoCoin";
import MedCoin from "../../components/Coins/MedCoin";
import ScCoin from "../../components/Coins/ScienceCoin";
import CategoryChart from "../../components/CategoryChart/categoryChart";
import MapChart from "../../components/Map/map";
import SexRations from "../../components/SexRatio/sexRatio";
import Medals from "../../components/MultipleMedals/medal";
import TimeLine from "../../components/Timeline/timeline";

const useStyles = makeStyles(styles);

export default function OnePager() {
    const classes = useStyles();

    const [coinType, setCoinType] = React.useState('medicine');

    function setLiteratureCoin() {
        setCoinType('literature');
    }

    function setScienceCoin() {
        setCoinType('science');
    }

    function setPeaceCoin() {
        setCoinType('peace');
    }

    function setMedicineCoin() {
        setCoinType('medicine');
    }

    function setEconomyCoin() {
        setCoinType('economy');
    }

    return (
        <div>
            <GridContainer>
                {coinType === "literature" &&
                <LitCoin/>
                }
                {coinType === "peace" &&
                <PCoin/>
                }
                {coinType === "economy" &&
                <EcoCoin/>
                }
                {coinType === "medicine" &&
                <MedCoin/>
                }
                {coinType === "science" &&
                <ScCoin/>
                }
            </GridContainer>
            <GridContainer style={{}}>
                <GridItem xs={12} sm={6} md={2} onClick={setLiteratureCoin}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="danger">
                                <Icon>menu_book</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>category</p>
                            <h3 className={classes.cardTitle}>
                                Literature
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2} onClick={setScienceCoin}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="primary">
                                <Icon>science</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>category</p>
                            <h3 className={classes.cardTitle}>
                                Physics and Chemistry
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2} onClick={setMedicineCoin}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Icon>healing</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>category</p>
                            <h3 className={classes.cardTitle}>
                                Physiology or Medicine
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2} onClick={setEconomyCoin}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Icon>auto_graph</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>category</p>
                            <h3 className={classes.cardTitle}>
                                Economics Science
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2} onClick={setPeaceCoin}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="info">
                                <Icon>accessibility_new</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>category</p>
                            <h3 className={classes.cardTitle}>
                                Peace

                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <div>
                        <MapChart/>
                    </div>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <CategoryChart/>
            </GridContainer>
            <GridContainer>
                <SexRations/>
                <Medals/>

            </GridContainer>
            <GridContainer>
                <TimeLine/>
            </GridContainer>
        </div>
    );
}
