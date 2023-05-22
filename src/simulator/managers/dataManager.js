import UserInfo from '../info/userInfo';
import CommunityInfo from '../info/communityInfo';

import * as levelData from '../../../assets/data/GAM_DATA.json'

/**
 * Clase para cargar la data
 */

const userKey = "users";
const communityKey = "communities";
export default class DataManager {

    constructor(simulatorMap) {
        this.users = {};
        this.communities = {};
        this.simulatorMap = simulatorMap;
    }

    loadData() {
        return new Promise((resolve, reject) => {
            let promises = [
                this.loadUsers(),
                this.loadCommunities()
            ];
            Promise.all(promises).then(function () {
                console.log("All data loaded");

                resolve();
            });
        });
    }

    loadUsers() {
        return new Promise((resolve, reject) => {
            let usersData = levelData.data[userKey];
            for (const userData of usersData) {
                let user = new UserInfo(userData);
                let idUser = user.getDataByKey("id");
                this.users[idUser] = user;
            }
            resolve();
        });
    }

    loadCommunities() {
        return new Promise((resolve, reject) => {
            let communitiesData = levelData.data[communityKey];
            let index = 0;
            for (const communityData of communitiesData) {
                let color = this.simulatorMap["communityColors"][index%10];
                let community = new CommunityInfo(communityData,color);
                let idCommunity = community.getDataByKey("id");
                this.communities[idCommunity] = community;
                index++;
            }
            resolve();
        });
    }

    getCommunities() {
        return this.communities;
    }

    getUsers() {
        return this.users;
    }

    getUserById(id) {
        return this.users[id];
    }

    getCommunityById(id) {
        return this.communities[id];
    }


}



