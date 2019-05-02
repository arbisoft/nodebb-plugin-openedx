<form role="form" class="openedx-discussion-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				Configure these settings to share session between openEdx and nodebb instance.
			</p>

			<div class="row panel panel-body">
				<div class="form-group">
					<label for="jwtCookieName">JWT cookie name</label>
					<input type="text" id="jwtCookieName" name="jwtCookieName" title="JWT Cookie Name"
						class="form-control" placeholder="Token">
				</div>
				<p>JWT Cookie Name: Name of the encoded jwt cookie that will be sent with requests to nodebb.</p>

			</div>

			<div class="row panel panel-body">
				<div class="form-group">
					<label for="secret">Secret</label>
					<input type="text" id="secret" name="secret" title="secret" class="form-control"
						placeholder="its a secret">
					<p>Secret: `key` for "key:value" pair of secret used for jwt encoding and decoding.</p>
				</div>
			</div>

			<div class="row panel panel-body">
				<div class="form-group">
					<label for="loginURL">Login URL</label>
					<input type="text" id="loginURL" name="loginURL" title="loginURL" class="form-control"
						placeholder="https://example.com/login">
					<p>Redirect Login Url: `login-url` for where to direct an user when he tries to login.</p>

				</div>
			</div>

			<div class="row panel panel-body">
				<div class="form-group">
					<label for="registrationURL">Registration URL</label>
					<input type="text" id="registrationURL" name="registrationURL" title="registrationURL"
						class="form-control" placeholder="https://example.com/register">
					<p>Redirect Registration Url: `registration-url` for where to direct an user when he tries to
						register.</p>

				</div>
			</div>

			<div class="row panel panel-body">
				<div class="form-group">
					<label for="logoutURL">Logout redirect URL</label>
					<input type="text" id="logoutURL" name="logoutURL" title="logoutURL" class="form-control"
						placeholder="https://example.com/logout">
					<p>Logout Url: `logout-url` is the openedx logout url which will be used to clear session when user
						logs out from nodebb.</p>

				</div>

			</div>
		</div>
	</div>
</form>

<button id="save"
	class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>