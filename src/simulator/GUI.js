export default class GUI {

    constructor(dataManager, scene, goDown) {
        this.dataManager = dataManager;
        this.scene = scene;
        this.goDown = goDown;
        document.getElementById("xcross").addEventListener('dblclick', () => {
            document.getElementById("info-box").className = "info retract";
            document.getElementById("icross").className = "smalliIcon myShow"
            document.getElementById("xcross").className = "smallXIcon hide";
        
            document.getElementById("title").className = "hide";
            document.getElementById("community-nUsers-row").className = "hide";
            this.goDown();
        });
    }

    changeBox(entity, type) {
        let title;
        let communityInfo;
        let userInfo;
        if (type === "User") {
            userInfo = this.dataManager.getUserById(entity.getName()).getData();
            let comEntity = this.scene.getEntity(entity.getInfo().getDataByKey("community"));
            communityInfo = this.dataManager.getCommunityById(comEntity.getName()).getData();
            title = "User: " + this.dataManager.getUserById(entity.getName()).getData().label;
            document.getElementById("title").className = "myShow";
            this.showUserInfo(userInfo);
        }
        else if (type === "Community") {
            communityInfo = this.dataManager.getCommunityById(entity.getName()).getData();
            title = "Community: " + this.dataManager.getCommunityById(entity.getName()).getData().name;
        }
        this.showCommunityInfo(communityInfo, type);

        document.getElementById("info-box").className = "info expand";
        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xcross").className = "smallXIcon myShow";

        document.getElementById("title").className = "myShow";
        document.getElementById("title").innerHTML = title;

    }

    showUserInfo(userInfo){
        document.getElementById("user-gender-row").className = "myShow";
        document.getElementById("user-gender").innerHTML = userInfo.explicit_community.Gender;
    }

    showCommunityInfo(communityInfo, type){
        if(type==="User"){
            document.getElementById("user-community-title-row").className = "myShow";
            document.getElementById("user-community-title").innerHTML = communityInfo.name;
        }
        if(type === "Community"){
            document.getElementById("user-community-title-row").className = "hide";
            document.getElementById("user-gender-row").className = "hide";
        }

        document.getElementById("community-nUsers-row").className = "myShow";
        document.getElementById("community-nUsers").innerHTML = communityInfo.users.length;
        
    }
}

