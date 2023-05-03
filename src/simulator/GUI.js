import Chart from 'chart.js/auto';
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

    filterCheckbox() {
        let filters = ["gen-Male", "gen-Female", "age-young", "age-adult", "age-elderly", "lang-GER", "lang-ES", "lang-FR", "lang-IT"];
        for (let id of filters) {
            document.getElementById(id).addEventListener('click', () => {
                this.filterMethod()
            });
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

    infoOpen() {
        document.getElementById("info-box").className = "info expand";
        document.getElementById("info-box").style.zIndex = 0;
        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xInfo").className = "pointer xInfo myShow";
        document.getElementById("infoDiv").className = "myShow";

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

    filterMethod() {
        let filters = ["gen-Male", "gen-Female", "age-young", "age-adult", "age-elderly", "lang-GER", "lang-ES", "lang-FR", "lang-IT"];
        let arrayFilter = [];
        for (let id of filters) {
            if (document.getElementById(id).checked) {
                arrayFilter.push(id.split("-")[1])
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
        this.infoOpen();

    }

    showUserInfo(userInfo) {
        let name = document.getElementById("nameUser");
        let infoEx = document.getElementById("infoExUser");
        name.innerHTML = "<h4>ID: " + userInfo["id"] + "</h4>";
        let gender=  "<div class='col'><h5>Gender: </h5><h4>" + userInfo["explicit_community"]["Gender"] + "</h4></div>";
        let age=  "<div class='col'><h5>Age: </h5><h4>" + userInfo["explicit_community"]["ageGroup"] + "</h4></div>";
        let language=  "<div class='col'><h5>Language: </h5><h4>" + userInfo["explicit_community"]["language"] + "</h4></div>";
        infoEx.innerHTML = gender + age + language

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

        this.buildExChart("Gender", "genderChart", statsEx.gender);
        this.buildExChart("Age", "ageChart", statsEx.age);
        this.buildExChart("Language", "languageChart", statsEx.language);

    }

    generateExStats(usersList){
        let stats = {
            age: {
                young: 0,
                adult: 0,
                elderly: 0,
            },
            gender: {
                Male: 0,
                Female: 0
            },
            language:{
                IT: 0,
                ES: 0,
                GER: 0,
                FR: 0
            }
        }
        for (let x of usersList) {
            let user = this.dataManager.getUserById(x).getDataByKey("explicit_community");
            stats.age[user["ageGroup"]]++;
            stats.gender[user["Gender"]]++;
            stats.language[user["language"]]++;
        }
        for(let key in stats){
            for(let key2 in stats[key]){
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

    buildExChart(title, canva, stats){
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
            yValues.push(y*100)
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

