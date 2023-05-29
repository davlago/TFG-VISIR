import Chart from 'chart.js/auto';
import * as levelData from '../../assets/data/DATA.json'
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

    /**
     * Funcion que pone la primera letra de uns tring en mayuscula
     * @param {*} str cadena a trransformar
     * @returns 
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    
    /**
     * Crea los checkbox de los filtros en funcion de los atributos
     */
    filterCheckbox() {
        let filters = [];
        for (let i = 1; i <= 3; i++) {
            let atriKey = "atribute" + ((i === 3) ? "B" : i);
            let atribute = levelData.keys[atriKey];
            let title = atribute.key;
            document.getElementById(atriKey + "-filterTitle").innerHTML = "<h5>" + this.capitalize(title) + "</h5>"
            for (let j = 1; j <= atribute.values.length; j++) {
                let id = "atribute" + ((i === 3) ? "B" : i) + "-filter" + j;
                let idCB = id + "-CB";
                let name = atribute.values[j - 1];
                document.getElementById(id).innerHTML = "<input class='form-check-input' type='checkbox' id='" + idCB + "' checked><label>" + this.capitalize(name) + "</label>"
                filters.push(idCB);
                document.getElementById(idCB).addEventListener('click', () => {
                    this.filterMethod(filters)
                });
            }
        }
    }

    /**
     * Muestra el cuadro de alerta.
     */
    displayAlertBox() {
        document.getElementById('miCuadroEmergente').style.display = 'block';
    }

    /**
     * Oculta el cuadro de alerta.
     */
    noDisplayAlertBox() {
        document.getElementById('miCuadroEmergente').style.display = 'none';
    }

    /**
     * Habilita la interacción del cuadro de alerta para mostrar y ocultar el cuadro emergente.
     */
    alertBox() {
        document.getElementById('info-box').addEventListener('mouseover', this.displayAlertBox);
        document.getElementById('info-box').addEventListener('mouseout', this.noDisplayAlertBox);

        document.getElementById('icross').addEventListener('mouseover', this.displayAlertBox);
        document.getElementById('icross').addEventListener('mouseout', this.noDisplayAlertBox);
    }

    /**
     * Deshabilita la interacción del cuadro de alerta para mostrar y ocultar el cuadro emergente.
     */
    noAlertBox() {
        document.getElementById('info-box').removeEventListener('mouseover', this.displayAlertBox);
        document.getElementById('info-box').removeEventListener('mouseout', this.noDisplayAlertBox);

        document.getElementById('icross').removeEventListener('mouseover', this.displayAlertBox);
        document.getElementById('icross').removeEventListener('mouseout', this.noDisplayAlertBox);
    }

    /**
     * Cierra el cuadro de información, ocultando su contenido y restableciendo su estado inicial.
     * Realiza acciones de animación y restablecimiento de elementos visuales.
     */
    infoClose() {
        document.getElementById("info-box").className = "info retract";
        document.getElementById("info-box").style.zIndex = 5;
        document.getElementById("infoDiv").className = "hide";
        document.getElementById("icross").className = "smalliIcon myShow"

        this.goDown();
        this.alertBox();
    }

    /**
     * Abre el cuadro de información con el contenido correspondiente al tipo especificado.
     * Realiza acciones de animación y visualización de elementos relacionados.
     *
     * @param {string} type - El tipo de información a mostrar.
     */
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

    /**
     * Abre el cuadro de filtro, mostrando su contenido y realizando acciones de animación para su visualización.
     */
    filterOpen() {
        document.getElementById("filter-box").className = "filter expand"
        document.getElementById("filterIcon").className = "hide"
        document.getElementById("filterDiv").className = "myShow transparent"
        setTimeout(() => {
            document.getElementById("filterDiv").className = "myShow"
        }, 250);

    }

    /**
     * Cierra el cuadro de filtro, ocultando su contenido y restableciendo su estado inicial.
     * Realiza acciones de animación y restablecimiento de elementos visuales.
     */
    filterClose() {
        document.getElementById("filterDiv").className = "hide"
        document.getElementById("filter-box").className = "filter retractFilter"
        document.getElementById("filterIcon").className = "myShow"
    }

    /**
     * Aplica los filtros seleccionados y realiza la acción de filtrado utilizando los valores seleccionados.
     * Obtiene los valores seleccionados de los elementos de filtro y llama a la función de filtrado correspondiente.
     *
     * @param {Array} filters - Los identificadores de los elementos de filtro seleccionados.
     */
    filterMethod(filters) {
        let arrayFilter = [];
        for (let id of filters) {
            if (document.getElementById(id).checked) {
                console.log(id)
                let atribute = id.split("-")[0];
                let valueIndex = id.split("-")[1].slice(-1);
                arrayFilter.push(levelData.keys[atribute].values[valueIndex - 1])
            }
        }
        this.filter(arrayFilter);
    }

    /**
     * Establece la información y muestra el cuadro de información para la entidad especificada.
     * Obtiene la información necesaria de los datos del administrador y actualiza los elementos visuales del cuadro de información.
     * Abre el cuadro de información correspondiente al tipo de entidad y muestra los datos relevantes.
     *
     * @param {Object} entity - La entidad para la cual se debe mostrar la información.
     */
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

    /**
     * Muestra la información del usuario en el cuadro de información.
     * Actualiza los elementos visuales con los datos del usuario proporcionados.
     *
     * @param {Object} userInfo - Los datos del usuario para mostrar.
     */
    showUserInfo(userInfo) {
        let name = document.getElementById("nameUser");
        let infoEx = document.getElementById("infoExUser");
        let contribution = document.getElementById("contributionUser");
        name.innerHTML = "<h4>ID: " + userInfo["id"] + "</h4>";
        let atribute1 = "<div class='col'><h5>" + levelData.keys.atribute1.key + ": </h5><h4>" + userInfo["explicit_community"][levelData.keys.atribute1.key] + "</h4></div>";
        let atribute2 = "<div class='col'><h5>" + levelData.keys.atribute2.key + "</h5><h4>" + userInfo["explicit_community"][levelData.keys.atribute2.key] + "</h4></div>";
        let atributeB = "<div class='col'><h5>" + levelData.keys.atributeB.key + "</h5><h4>" + userInfo["explicit_community"][levelData.keys.atributeB.key] + "</h4></div>";
        infoEx.innerHTML = atribute1 + atribute2 + atributeB
        if (userInfo["community_interactions"][0] !== undefined) {
            let artId = userInfo["community_interactions"][0]["artwork_id"]

            let artwork = levelData.data["artworks"].find(function (a) {
                return JSON.stringify(a["@id"]) === artId
            })
            contribution.innerHTML = "<hr class='hr2'></hr><h4>Most important contribution: </h4> <img src='" + artwork["image"] + "' style='max-height: 200px; width: auto;'></img> <h5 style='text-align: center;'>" + artwork["tittle"] + "</h5>"
        }
        else{
            contribution.innerHTML = ""
        }
    }

    /**
     * Muestra la información de la comunidad en el cuadro de información.
     * Actualiza los elementos visuales con los datos de la comunidad proporcionados.
     *
     * @param {Object} communityInfo - Los datos de la comunidad para mostrar.
     */
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
        if (explanation !== undefined) {
            this.buildImChart(explanation["explanation_data"]);
        }
        else {
            document.getElementById("infoImCommunity").innerHTML = ""
        }
        let statsEx = this.generateExStats(communityInfo["users"])
        this.buildExChart(levelData.keys.atribute1.key, "atribute1Chart", statsEx.atribute1);
        this.buildExChart(levelData.keys.atribute2.key, "atribute2Chart", statsEx.atribute2);
        this.buildExChart(levelData.keys.atributeB.key, "atributeBChart", statsEx.atributeB);

    }

    /**
     * Genera estadísticas de atributos explicitos para la lista de usuarios proporcionada.
     * Calcula la frecuencia de los valores de los atributos en la lista de usuarios y normaliza los resultados.
     *
     * @param {Array} usersList - La lista de usuarios para la cual se deben generar las estadísticas.
     * @returns {Object} - Las estadísticas de atributos generadas.
     */
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

    /**
     * Construye un gráfico  para mostrar los atributos implicitos de la comunidad.
     * Crea un gráfico utilizando los datos proporcionados y los muestra en el elemento visual correspondiente.
     *
     * @param {Object} eData - Los datos de los atributos implicitos de la comunidad para mostrar en el gráfico.
     */
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

    /**
     * Construye un gráfico de dona para mostrar datos de atributos explícitos de la comunidad.
     * Crea un gráfico utilizando los datos proporcionados y los muestra en el elemento visual correspondiente.
     *
     * @param {string} title - El título del gráfico.
     * @param {string} canva - El identificador del elemento visual del gráfico.
     * @param {Object} stats - Los datos de atributos explícitos de la comunidad para mostrar en el gráfico.
     */
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

