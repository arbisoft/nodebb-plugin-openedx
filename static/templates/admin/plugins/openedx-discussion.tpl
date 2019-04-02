<form role="form" class="openedx-discussion-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				Configure these settings to share session between openEdx and nodebb instance.

				JWT Cookie Name: Name of the encoded jwt cookie that will be sent with requests to nodebb.
				Secret: "key" for "key:value" pair of secret used for jwt encoding and decoding.
			</p>
			<div class="form-group">
				<label for="jwt-cookie-name">JWT cookie name</label>
				<input type="text" id="jwt-cookie-name" name="jwtCookieName" title="JWT Cookie Name" class="form-control" placeholder="Token">
			</div>
			<div class="form-group">
				<label for="secret">Secret</label>
				<input type="text" id="secret" name="secret" title="secret" class="secret" placeholder="not so secret">
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
