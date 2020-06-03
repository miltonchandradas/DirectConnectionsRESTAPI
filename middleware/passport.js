const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const xsHDBConn = require("@sap/hdbext");
const xsenv = require("@sap/xsenv");
const dbClass = require("sap-hdbext-promisfied");

let hanaOptions = xsenv.getServices({
	hana: {
		tag: "hana"
	}
});

let fbconfig = require("../config/fbconfig");

/*passport.use(
	"facebookToken",
	new FacebookTokenStrategy({
			clientID: fbconfig.clientID,
			clientSecret: fbconfig.clientSecret,
		},
		async(accessToken, refreshToken, profile, done) => {
			try {
				console.log("accessToken", accessToken);
				console.log("refreshToken", refreshToken);
				console.log("profile", profile);
				console.log(hanaOptions);

				// Check for user
				// const dbClass = require("../utils/dbPromises");
				let connection = await dbClass.createConnectionFromEnv(dbClass.resolveEnv(hanaOptions));
				let db = new dbClass(connection);

				let sql = `SELECT * FROM "FbUser" WHERE "id" = ?`;
				console.log(sql);

				let statement = await db.preparePromisified(sql);

				let results = await db.statementExecPromisified(statement, [profile.id]);

				console.log(results);

				if (results[0])
					return done(null, results[0]);

				sql =
					`INSERT INTO "FbUser" ("id", "firstName", "lastName", "email") VALUES(?, ?, ?, ?)`;
				console.log(sql);

				statement = await db.preparePromisified(sql);

				console.log("id", profile.id);
				console.log("id", profile.name.givenName);
				console.log("id", profile.name.familyName);
				console.log("id", profile.emails[0].value);

				results = await db.statementExecPromisified(statement, [profile.id, profile.name.givenName, profile.name.familyName, profile.emails[
					0].value]);

				sql = `SELECT * FROM "FbUser" WHERE "id" = ?`;
				console.log(sql);

				statement = await db.preparePromisified(sql);

				results = await db.statementExecPromisified(statement, [profile.id]);

				console.log(results);

				if (results[0])
					return done(null, results[0]);

			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);*/

passport.use(
	"facebookToken",
	new FacebookTokenStrategy({
			clientID: fbconfig.clientID,
			clientSecret: fbconfig.clientSecret,
		},
		async(accessToken, refreshToken, profile, done) => {
			try {
				console.log("accessToken", accessToken);
				console.log("refreshToken", refreshToken);
				console.log("profile", profile);
				console.log(hanaOptions);

				// Check for user
				// const dbClass = require("../utils/dbPromises");
				let connection = await dbClass.createConnectionFromEnv(dbClass.resolveEnv(hanaOptions));
				let db = new dbClass(connection);

				let sql = `SELECT * FROM "User" WHERE "fbId" = ?`;
				console.log(sql);

				let statement = await db.preparePromisified(sql);

				let results = await db.statementExecPromisified(statement, [profile.id]);

				console.log(results);

				if (results[0])
					return done(null, results[0]);

				sql =
					`INSERT INTO "User" ("fbId", "firstName", "lastName", "email", "isFacebookUser") VALUES(?, ?, ?, ?, true)`;
				console.log(sql);

				statement = await db.preparePromisified(sql);

				console.log("id", profile.id);
				console.log("id", profile.name.givenName);
				console.log("id", profile.name.familyName);
				console.log("id", profile.emails[0].value);

				results = await db.statementExecPromisified(statement, [profile.id, profile.name.givenName, profile.name.familyName, profile.emails[
					0].value]);

				sql = `SELECT * FROM "User" WHERE "email" = ?`;
				console.log(sql);

				statement = await db.preparePromisified(sql);

				results = await db.statementExecPromisified(statement, [profile.emails[0].value]);

				console.log(results);

				if (results[0])
					return done(null, results[0]);

			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);