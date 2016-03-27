class DB {
	constructor() {
		this.db = new Dexie("WingbaseConfig");
		this.db.version(1).stores({config: "++id,name,age"});
		this.db.open();
	}
}
