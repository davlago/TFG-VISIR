import Chart from 'chart.js/auto';
import * as levelData from '../../assets/data/GAM_DATA.json'
export default class GUI {

    constructor(dataManager, scene, goDown, filter) {
        this.dataManager = dataManager;
        this.scene = scene;
        this.goDown = goDown;
        this.filter = filter;


        document.getElementById("xInfo").addEventListener('click', () => {
            this.infoClose()
        });

        document.getElementById("filterIcon").addEventListener('click', () => {
            this.filterOpen()
        });
        document.getElementById("xFilter").addEventListener('click', () => {
            this.filterClose()
        });
        this.filterCheckbox();

        this.alertBox()


    }

    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    filterCheckbox() {
        let filters = [];
        for (let i = 1; i <= 3; i++) {
            let atriKey = "atribute"+((i===3) ? "B" : i);
            let atribute = levelData.keys[atriKey];
            let title = atribute.key;
            document.getElementById(atriKey+"-filterTitle").innerHTML = "<h5>"+this.capitalize(title)+"</h5>"
            for (let j = 1; j <=atribute.values.length; j++) {
                let id = "atribute"+((i===3) ? "B" : i) + "-filter"+j;
                let idCB = id+"-CB";
                let name = atribute.values[j-1];
                document.getElementById(id).innerHTML = "<input class='form-check-input' type='checkbox' id='"+idCB+"' checked><label>"+ this.capitalize(name)+"</label>"
                filters.push(idCB);
                document.getElementById(idCB).addEventListener('click', () => {
                    this.filterMethod(filters)
                });
            }
        }
    }

    displayAlertBox() {
        document.getElementById('miCuadroEmergente').style.display = 'block';
    }
    noDisplayAlertBox() {
        document.getElementById('miCuadroEmergente').style.display = 'none';
    }

    alertBox() {
        document.getElementById('info-box').addEventListener('mouseover', this.displayAlertBox);
        document.getElementById('info-box').addEventListener('mouseout', this.noDisplayAlertBox);

        document.getElementById('icross').addEventListener('mouseover', this.displayAlertBox);
        document.getElementById('icross').addEventListener('mouseout', this.noDisplayAlertBox);
    }

    noAlertBox() {
        document.getElementById('info-box').removeEventListener('mouseover', this.displayAlertBox);
        document.getElementById('info-box').removeEventListener('mouseout', this.noDisplayAlertBox);

        document.getElementById('icross').removeEventListener('mouseover', this.displayAlertBox);
        document.getElementById('icross').removeEventListener('mouseout', this.noDisplayAlertBox);
    }

    infoClose() {
        document.getElementById("info-box").className = "info retract";
        document.getElementById("info-box").style.zIndex = 5;
        document.getElementById("infoDiv").className = "hide";
        document.getElementById("icross").className = "smalliIcon myShow"

        this.goDown();
        this.alertBox();
    }

    infoOpen(type) {
        let info_box = document.getElementById("info-box")
        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xInfo").className = "pointer xInfo myShow";
        document.getElementById("infoDiv").className = "myShow";
        if (type === "user") {
            document.getElementById("rowUser").className = "row transparent"
            if (info_box.classList.contains("retract")) {
                setTimeout(() => {
                    document.getElementById("rowUser").className = "row"
                }, 250);
            }
            else {
                document.getElementById("rowUser").className = "row"
            }

        }
        info_box.className = "info expand";
        info_box.style.zIndex = 0;
        this.noAlertBox()
    }

    filterOpen() {
        document.getElementById("filter-box").className = "filter expand"
        document.getElementById("filterIcon").className = "hide"
        document.getElementById("filterDiv").className = "myShow transparent"
        setTimeout(() => {
            document.getElementById("filterDiv").className = "myShow"
        }, 250);

    }

    filterClose() {
        document.getElementById("filterDiv").className = "hide"
        document.getElementById("filter-box").className = "filter retractFilter"
        document.getElementById("filterIcon").className = "myShow"
    }
    
    filterMethod(filters) {
        let arrayFilter = [];
        for (let id of filters) {
            if (document.getElementById(id).checked) {
                console.log(id)
                let atribute = id.split("-")[0];
                let valueIndex = id.split("-")[1].slice(-1);
                arrayFilter.push(levelData.keys[atribute].values[valueIndex-1])
            }
        }
        this.filter(arrayFilter);
    }


    setInfo(entity) {
        let title;
        let communityInfo;
        let userInfo;
        if (entity.getType() === "user") {
            userInfo = this.dataManager.getUserById(entity.getName()).getData();
            let comEntity = this.scene.getEntity(entity.getInfo().getDataByKey("community"));
            communityInfo = this.dataManager.getCommunityById(comEntity.getName()).getData();
            title = "User: " + this.dataManager.getUserById(entity.getName()).getData().label;
            document.getElementById("rowUser").className = "row";

            this.showUserInfo(userInfo)
        }
        else if (entity.getType() === "community") {
            document.getElementById("rowUser").className = "hide";
            communityInfo = this.dataManager.getCommunityById(entity.getName()).getData();
            title = "Community: " + this.dataManager.getCommunityById(entity.getName()).getData().name;
        }
        this.showCommunityInfo(communityInfo)
        this.infoOpen(entity.getType());

    }

    showUserInfo(userInfo) {
        let name = document.getElementById("nameUser");
        let infoEx = document.getElementById("infoExUser");
        let contribution = document.getElementById("contributionUser");
        name.innerHTML = "<h4>ID: " + userInfo["id"] + "</h4>";
        let atribute1 = "<div class='col'><h5>" + levelData.keys.atribute1.key + ": </h5><h4>" + userInfo["explicit_community"][levelData.keys.atribute1.key] + "</h4></div>";
        let atribute2 = "<div class='col'><h5>" + levelData.keys.atribute2.key + "</h5><h4>" + userInfo["explicit_community"][levelData.keys.atribute2.key] + "</h4></div>";
        let atributeB = "<div class='col'><h5>" + levelData.keys.atributeB.key + "</h5><h4>" + userInfo["explicit_community"][levelData.keys.atributeB.key] + "</h4></div>";
        infoEx.innerHTML = atribute1 + atribute2 + atributeB
        let artId = userInfo["community_interactions"][0]["artwork_id"]
        console.log(artId)
        let artwork = levelData.data["artworks"].find(function (a) {
            return JSON.stringify(a["@id"]) === artId
        })
        contribution.innerHTML = "<h4>Most important contribution: </h4> <img src='" + artwork["image"] + "' style='max-height: 200px; width: auto;'></img> <h5 style='text-align: center;'>" + artwork["tittle"] + "</h5>"
    }

    showCommunityInfo(communityInfo) {
        let name = document.getElementById("nameCommunity");
        let nUsers = document.getElementById("nUsersCommunity");
        name.innerHTML = "<h4>" + communityInfo["name"] + "</h4>";
        nUsers.innerHTML = "<h4>N Users: " + communityInfo["users"].length + "</h4>";
        let explanations = communityInfo["explanations"];
        let explanation;
        for (let e of explanations) {
            if (e["explanation_type"] === 3) {
                explanation = e;
                break;
            }
        }
        this.buildImChart(explanation["explanation_data"]);
        let statsEx = this.generateExStats(communityInfo["users"])
        console.log(statsEx)
        this.buildExChart(levelData.keys.atribute1.key, "atribute1Chart", statsEx.atribute1);
        this.buildExChart(levelData.keys.atribute2.key, "atribute2Chart", statsEx.atribute2);
        this.buildExChart(levelData.keys.atributeB.key, "atributeBChart", statsEx.atributeB);

    }

    generateExStats(usersList) {
        let stats = {
            atribute1: {},
            atribute2: {},
            atributeB: {}
        }
        for (let x of usersList) {
            let user = this.dataManager.getUserById(x).getDataByKey("explicit_community");
            let a1 = user[levelData.keys.atribute1.key]
            let a2 = user[levelData.keys.atribute2.key]
            let aB = user[levelData.keys.atributeB.key]
            stats.atribute1[a1] === undefined ? stats.atribute1[a1] = 1 : stats.atribute1[a1]++;
            stats.atribute2[a2] === undefined ? stats.atribute2[a2] = 1 : stats.atribute2[a2]++;
            stats.atributeB[aB] === undefined ? stats.atributeB[aB] = 1 : stats.atributeB[aB]++;
        }
        for (let key in stats) {
            for (let key2 in stats[key]) {
                stats[key][key2] /= usersList.length;
            }
        }
        return stats;
    }

    buildImChart(eData) {
        document.getElementById("infoImCommunity").innerHTML = "<canvas class='grafico' id ='graficoIm'></canvas>"

        let xValues = [];
        let yValues = [];
        let barColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9",
            "#1e7145"
        ];

        for (let x of eData["data"]) {
            xValues.push(x["value"])
            yValues.push(x["count"])
        }
        let ctx = document.getElementById('graficoIm').getContext('2d');
        const myChar = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues

                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 20,
                            },
                            boxWidth: 20,
                            color: "white"
                        },
                    },
                    title: {
                        font: {
                            size: 20,
                        },
                        display: true,
                        text: eData["label"],
                        color: "white"
                    }
                },
                mantainAspectRatio: false,
                aspectRatio: 3

            }
        });
    }

    buildExChart(title, canva, stats) {
        document.getElementById(canva).innerHTML = "<canvas id ='" + canva + "_canvas'></canvas>"

        let xValues = [];
        let yValues = [];
        let barColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9",
            "#1e7145"
        ];

        for (let [x, y] of Object.entries(stats)) {
            xValues.push(x)
            yValues.push(y * 100)
        }


        let ctx = document.getElementById(canva + "_canvas").getContext('2d');
        const myChar = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues

                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        font: {
                            size: 20,
                        },
                        display: true,
                        text: title,
                        color: "white"
                    }
                },
                mantainAspectRatio: false,
                aspectRatio: 1

            }
        });
    }


}

