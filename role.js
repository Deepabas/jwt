
const AccessControl = require("accesscontrol");
const auth = new AccessControl();

exports.role = (function() {

auth.grant("user").readOwn("profile").updateOwn("profile")

 auth.grant("admin").extend("user").readAny("profile")

 auth.grant("superadmin").extend("user").extend("admin").updateAny("profile").deleteAny("profile")

return auth; })();