import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "..";
import Server from "@/interfaces/Server";
import { saveCache } from "@/utils/localCache";

interface ServerObj {
  [key: string]: Server;
}

@Module({ dynamic: true, store, namespaced: true, name: "servers" })
class Servers extends VuexModule {
  servers: ServerObj = {};

  @Mutation
  private INIT_SERVERS(payload: ServerObj | any) {
    this.servers = payload;
  }

  @Action
  public InitServers(payload: ServerObj | any) {
    saveCache("servers", payload);
    this.INIT_SERVERS(payload);
  }
}
export const ServersModule = getModule(Servers);