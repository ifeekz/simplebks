import debug from "debug";
import { AuthInterface } from "./auth.interface";
import { SellerDto } from "../sellers/seller.dto";
import { DbManager } from "../common/common.db.config";
import { Collection, Db, MongoClient } from "mongodb";

const log: debug.IDebugger = debug("app:in-memory-dao");

class AuthService extends DbManager implements AuthInterface {
  db: Db | undefined;
  sellers: Collection | undefined;

  constructor() {
    super();
    this.connect();
  }

  async connect() {
    const client = new MongoClient(this.uri);
    try {
      // Connect to the MongoDB cluster
      const connection = await client.connect();
      this.db = connection.db(this.dbName);
      this.sellers = this.db.collection("sellers");
    } catch (e) {
      console.error(e);
    }
  }

  async login(username: string, password: string) {
    try {
      const seller = await this.sellers?.findOne(
        { seller_id: username, seller_zip_code_prefix: password },
        {}
      );
      
      return seller;
    } catch (e) {
      return e;
    }
  }

  async getSeller(resourceId: string) {}
}

export default new AuthService();