var renderCurrencies = function() {
  React.render(
    <CurrencyList />,
    document.getElementById('currencies')
  );
};

var refreshAccounts = function() {
  React.unmountComponentAtNode(document.getElementById('accounts'));
  renderAccounts();
};

var renderAccounts = function() {
  React.render(
    <AccountList />,
    document.getElementById('accounts')
  );
};

var renderContacts = function() {
  React.render(
    <ContactList />,
    document.getElementById('contacts')
  );
};

var renderRates = function() {
  React.render(
    <RateList />,
    document.getElementById('rates')
  );
};

var renderAcctDetail = function(key, name) {
  React.render(
    <AccountDetailModal key={key} mykey={key} name={name}/>,
    document.getElementById('acctDetail')
  );
};

var refresh = function() {
  $.ajax({
    url: 'refresh',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      React.render(
        <SuccessAlert message='OAuth2 Refresh Success'/>,
        document.getElementById('debugDiv')
      );
    }.bind(this),
    error: function(err) {
      React.render(
        <ErrorAlert message={err.responseText}/>,
        document.getElementById('debugDiv')
      );
    },
    beforeSend: setNoCache
  });
};

var logout = function() {
  $.ajax({
    url: 'logout',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      React.render(
        <InfoAlert message='OAuth2 Logout Success'/>,
        document.getElementById('debugDiv')
      );
    }.bind(this),
    error: function(err) {
      React.render(
        <ErrorAlert message={err.responseText}/>,
        document.getElementById('debugDiv')
      );
    },
    beforeSend: setNoCache
  });
};

