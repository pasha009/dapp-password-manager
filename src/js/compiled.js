(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addpass'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h2 class=\"display-5\">Add Password</h2>\n<p class=\"lead\">Add password to Password Manager</p>\n<p>You can click on a password to decrypt it using your master password.</p>\n<div class=\"form-group\">\n<label>Password Title</label>\n    <input id=\"add-pass-title\" type=\"text\" class=\"form-control\" name=\"title\" required=\"required\">\n</div>\n<div class=\"form-group\">\n  <label>Password</label>\n    <input id=\"add-pass-password\" type=\"password\" class=\"form-control\" name=\"password\" required=\"required\">\n</div>\n<div class=\"form-group\">\n  <label>Master Password</label>\n    <input id=\"add-pass-master\" type=\"password\" class=\"form-control\" name=\"master_password\" required=\"required\">\n    <div class=\"divider\"/>\n</div>\n<a id=\"save-pass-button\" class=\"btn btn-primary btn\" href=\"#\" role=\"button\">Add Password</a>\n<div class=\"divider\"/>\n<a id=\"cancel-pass-button\" class=\"btn btn-danger btn\" href=\"#\" role=\"button\">Cancel</a>\n";
},"useData":true});
templates['error'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"alert alert-danger alert-dismissable fade in\">\n  <button type=\"button\" data-dismiss=\"alert\" aria-label=\"close\" class=\"close\">\n    <span aria-hidden=\"true\">×</span>\n  </button>\n  <strong>Error!</strong>\n  "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"error","hash":{},"data":data}) : helper)))
    + "\n</div>\n";
},"useData":true});
templates['hello'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1> Hello </h1>\n";
},"useData":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<form action=\"#\">\n\n    <div class=\"jumbotron\">\n      <h2 class=\"display-5\">Hello "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n      <p class=\"lead\">Login with your master password</p>\n    </div>\n    <h4 class=\"text-center\">Master Password</h4>\n    <h4> "
    + alias4(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"error","hash":{},"data":data}) : helper)))
    + " </h4>\n    <div class=\"form-group\">\n      <input id=\"login-password\" data-toggle=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" required=\"required\">\n    </div>\n    <div class=\"form-group\">\n        <button id=\"login-button\" type=\"submit\" class=\"btn btn-primary btn-block\">Log in</button>\n    </div>\n</form>\n";
},"useData":true});
templates['modal'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"modal fade\" id=\"exampleModalCenter\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">#"
    + alias4(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"number","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"text-center\">"
    + alias4(((helper = (helper = helpers.password || (depth0 != null ? depth0.password : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"password","hash":{},"data":data}) : helper)))
    + "</div>\n        <div class=\"divider\"/>\n  			<div class=\"form-group\">\n  				<label>Master Password</label>\n  	        <input id=\"modal-master\" type=\"password\" class=\"form-control\" name=\"master_password\" required=\"required\">\n  	    </div>\n\n        <div id=\"new-title\" class=\"form-group\">\n        <label>New Password Title</label>\n            <input id=\"new-pass-title\" type=\"text\" class=\"form-control\" name=\"title\">\n        </div>\n        <div id=\"new-pass\" class=\"form-group\">\n          <label>New Password</label>\n            <input id=\"new-pass-password\" type=\"password\" class=\"form-control\" name=\"password\">\n        </div>\n        <div class=\"divider\"/>\n        <div class=\"form-group\">\n  	      <button id=\"modal-decrypt\" class=\"btn btn-primary\">Show Password</button>\n  	    </div>\n\n        <div id=\"pass-decrypt\" class=\"text-center\"></div>\n        <div id=\"delete-warning\" class=\"alert alert-danger text-center\" role=\"alert\">\n           Delete is irreversible. Are you Sure ?\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n\n        <button id=\"delete-pass-button\" type=\"button\" class=\"btn btn-danger\">Delete Password</button>\n        <button id=\"change-pass-button\" type=\"button\" class=\"btn btn-info\" >Change Password</button>\n        <div class=\"divider\" />\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['passwords'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <li onclick=\"App.showPasswordPopUp("
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + ")\" class=\"list-group-item password_li d-flex justify-content-between align-items-center\">\n    "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n    <span class=\"badge badge-primary badge-pill\">"
    + alias4(((helper = (helper = helpers.requests || (depth0 != null ? depth0.requests : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"requests","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n  </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"jumbotron\" id=\"dash-jumbo\">\n  <div class=\"container\">\n    <h2 class=\"display-5\">Hello!</h2>\n    <p class=\"lead\">Here are all your passwords.</p>\n    <p>You can click on a password to decrypt it using your master password.</p>\n    <a id=\"add-pass-button\" class=\"btn btn-primary\" href=\"#\" role=\"button\">Add Password</a>\n    <div class=\"divider\"/>\n    <a id=\"logout-pass-button\" class=\"btn btn-danger\" href=\"#\" role=\"button\">Logout</a>\n  </div>\n</div>\n<div id=\"passFormEntry\" class=\"jumbotron\">\n</div>\n<ul class=\"list-group password_li\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.passtable : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});
templates['signup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form action=\"#\" oninput='confirm_password.setCustomValidity(confirm_password.value != password.value ? \"Passwords do not match.\" : \"\")'>\n		<h3>Create Account</h3>\n		<p>No account associated with given key.</p>\n		<hr>\n      <div class=\"form-group\">\n			<label>Username</label>\n        	<input id=\"signup-name\" type=\"text\" class=\"form-control\" name=\"Username\" required=\"required\">\n      </div>\n			<div class=\"form-group\">\n				<label>Master Password</label>\n	        <input id=\"signup-password\" data-toggle=\"password\" type=\"password\" class=\"form-control\" name=\"password\" required=\"required\">\n	    </div>\n			<div class=\"form-group\">\n				<label>Confirm Master Password</label>\n	        <input id=\"signup-password-conf\" data-toggle=\"password\" type=\"password\" class=\"form-control\" name=\"confirm_password\" required=\"required\">\n	    </div>\n			<div class=\"form-group\">\n	        <button id=\"signup-button\" class=\"btn btn-primary btn-block btn-lg\">Create Account</button>\n	    </div>\n    </form>\n	<div class=\"text-center\"> Master Password is not recoverable.</div>\n";
},"useData":true});
})();