function setNoCache(xhr) {
  xhr.setRequestHeader('Cache-Control', 'no-cache');
}

var AlertMixin = {
  render: function() {
    var classes = "alert " + this.state.alertClass;
    return (
      <div role="alert" className={classes}>
        <span className={this.state.glyph}
          aria-hidden="true"></span>
        <span className="sr-only">Error:</span>
        &nbsp; {this.props.message}
      </div>
    );
  }
};

var GetMixin = {
  getInitialState: function() {
    return {data: []};
  },
  getInfo:function() {
    $.ajax({
      url: this.state.path,
      type: 'GET',
      dataType: 'json',
        success: function(data) { 
        this.setState({data:data});
        React.render(
          <div/>,
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
  },
  componentDidMount: function() {
     this.getInfo();
  }
};

var SuccessAlert = React.createClass({
  mixins: [AlertMixin],
  getInitialState: function() {
    return {
      alertClass : "alert-success",
      glyph      : "glyphicon glyphicon-thumbs-up"
    };
  }
});

var InfoAlert = React.createClass({
  mixins: [AlertMixin],
  getInitialState: function() {
    return {
      alertClass : "alert-info",
      glyph      : "glyphicon glyphicon-info-sign"
    };
  }
});

var ErrorAlert = React.createClass({
  mixins: [AlertMixin],
  getInitialState: function() {
    return {
      alertClass : "alert-danger",
      glyph      : "glyphicon glyphicon-exclamation-sign"
    };
  }
});

var WarningAlert = React.createClass({
  mixins: [AlertMixin],
  getInitialState: function() {
    return {
      alertClass : "alert-warning",
      glyph      : "glyphicon glyphicon-exclamation-sign"
    };
  }
});

var Account = React.createClass({
  render: function() {
    var trStyle = {
      cursor: "pointer"
    };
    return (
      <tr style={trStyle} title={"Click for " + this.props.name + " details."}
        data-toggle="modal" data-target="#acctModal"
        data-mykey={this.props.mykey} data-name={this.props.name}>
        <td> {this.props.name} </td>
        <td> {this.props.balance} </td>
        <td> {this.props.currency} </td>
      </tr>
    );
  }
});

var AccountList = React.createClass({
  mixins: [GetMixin],
  getInitialState: function() {
    return {path: 'accounts'};
  },
  render: function() {
    var accounts = this.state.data.map(function(acct) {
      return <Account key={acct.id} mykey={acct.id} name={acct.name} balance={acct.balance.amount} currency={acct.balance.currency}/>;
    });
    return (
      <table className="table">
        <tr>
          <th></th>
          <th>Balance</th>
          <th>Currency</th>
        </tr>
        {accounts}
      </table>
    );
  }
});

var Currency = React.createClass({
  render: function() {
    var name = this.props.name;
    name = name.substring(0, name.length - 6);
    return (
      <tr>
      <td>{name}</td>
      <td>{this.props.id}</td>
      </tr>
    );
  }
});

var CurrencyList = React.createClass({
  mixins: [GetMixin],
  getInitialState: function() {
    return {path: 'currencies'};
  },
  render: function() {
    var self = this;
    var book = {};
    var currencies = self.state.data.filter(
      function(item) { //remove dupes
        if (item[1] in book) {return false;}
        book[item[1]] = true;
        return true;
      }
    ).map(function(currency) {
      var key = JSON.stringify(currency);
      return <Currency key={key} name={currency[0]} id={currency[1]}/>
    });
    return (
      <table className="table">
        <tr>
          <th>Name</th>
          <th>ID</th>
        </tr>
        {currencies}
      </table>
    );
  }
});

var Contact = React.createClass({
  render: function() {
    return (
      <tr>
        <td> {this.props.name} </td>
        <td> {this.props.email} </td>
      </tr>
    );
  }
});

var ContactList = React.createClass({
  mixins: [GetMixin],
  getInitialState: function() {
    return {path: 'contacts'};
  },
  render: function() {
    var contacts = this.state.data.map(function(contact) {
      return <Contact key={contact.email} name={contact.name} email={contact.email}/>;
    });
    return (
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
        {contacts}
      </table>
    );
  }
});

var Rate = React.createClass({
  render: function() {
    return (
      <tr>
        <td> {this.props.from} </td>
        <td> {this.props.to} </td>
        <td> {this.props.rate} </td>
      </tr>
    );
  }
});

var RateList = React.createClass({
  mixins: [GetMixin],
  getInitialState: function() {
    return {path: 'rates'};
  },
  render: function() {
    var keys  = Object.keys(this.state.data);
    var skeys = _.sortBy(keys, function(key) {return key});
    var rates = _.map(skeys, function(key) {
      var rateVal = this.state.data[key];
      var from    = key.substring(0,3).toUpperCase();
      var to      = key.substring(key.length - 3).toUpperCase();
      return <Rate key={key} id={key} rate={rateVal} from={from} to={to}/>;
    }.bind(this));
    return (
      <table className="table">
        <tr>
          <th>From</th>
          <th>TO</th>
          <th>Rate</th>
        </tr>
        {rates}
      </table>
    );
  }
});

var Txn = React.createClass({
  render: function() {
    var email = this.props.data.recipient
      ? this.props.data.recipient.email
      : 'unknown'
    var amount = this.props.data.amount
      ? this.props.data.amount.amount
      : 'unknown'
    return (
      <tr>
        <td> 
          <button type="button" className="btn btn-default" 
            data-toggle="modal" data-target="#acctModal"
            data-mykey={this.props.mykey} data-name={this.props.name}
            aria-label="Txn Details" title="Txn Details">
            <span className="glyphicon glyphicon-modal-window" 
              aria-hidden="true"></span>
          </button>
        </td>
        <td> {this.props.data.created_at} </td>
        <td> {email} </td>
        <td> {amount} </td>
      </tr>
    );
  }
});

var TxnList = React.createClass({
  mixins: [GetMixin],
  getInitialState: function() {
    return {
      path: 'account/' + this.props.mykey + '/transactions'
    };
  },
  render: function() {
    var txns = this.state.data.map(function(txn) {
      return <Txn key={txn.id} mykey={txn.id} data={txn}/>;
    });
    console.log("ejs txns len " + this.state.data.length);
    return (
      <table className="table">
        <tr>
          <th></th>
          <th>Date</th>
          <th>Recipient</th>
          <th>Amount</th>
        </tr>
        {txns}
      </table>
    );
  }
});

var XFer = React.createClass({
  render: function() {
    var cb_fees = this.props.data.fees
      ? this.props.data.fees.coinbase.cents
      : 'unknown'
    var bank_fees = this.props.data.fees
      ? this.props.data.fees.bank.cents
      : 'unknown'
    return (
      <tr>
        <td> 
          <button type="button" className="btn btn-default" 
            data-toggle="modal" data-target="#acctModal"
            data-mykey={this.props.mykey} data-name={this.props.name}
            aria-label="Txn Details" title="Txn Details">
            <span className="glyphicon glyphicon-modal-window" 
              aria-hidden="true"></span>
          </button>
        </td>
        <td> {this.props.data.payout_date} </td>
        <td> {this.props.data.description} </td>
        <td> {cb_fees} </td>
        <td> {bank_fees} </td>
      </tr>
    );
  }
});

var XFerList = React.createClass({
  mixins: [GetMixin],
  getInitialState: function() {
    return {
      path: 'account/' + this.props.mykey + '/transfers'
    };
  },
  render: function() {
    var txns = this.state.data.map(function(xfer) {
      return <XFer key={xfer.id} mykey={xfer.id} data={xfer}/>;
    });
    return (
      <table className="table">
        <tr>
          <th></th>
          <th>Payout Date</th>
          <th>Description</th>
          <th>Coinbase Fees (cents)</th>
          <th>Bank Fees (cents)</th>
        </tr>
        {txns}
      </table>
    );
  }
});

var AccountBal = React.createClass({
  mixins: [GetMixin],
  getInitialState: function() {
    return {
      path: 'account/' + this.props.mykey + '/balance'
    };
  },
  render: function() {
    if (!this.state.data.amount) {
      console.log("ejs null bal");
      return (<div/>);
    }
    console.log("ejs real bal");
    return (
      <table className="table">
        <tr>
          <td>Amount</td>
          <td>{this.state.data.amount}</td>
        </tr>
        <tr>
          <td>Currency</td>
          <td>{this.state.data.currency}</td>
        </tr>
      </table>
    )
  }
});

var AccountInfo = React.createClass({
  mixins: [GetMixin],
  getInitialState: function() {
    return {
      path: 'account/' + this.props.mykey
    };
  },
  render: function() {
    if (!this.state.data.balance) return (<div/>);
    return (
      <div>
      <h3>Name {this.state.data.name}</h3>
      <h3>Amt {this.state.data.balance.amount}</h3>
      <h3>Cur {this.state.data.balance.currency}</h3>
      </div>
    )
  }
});

var AccountDetailModal = React.createClass({
  render: function() {
    return (
      <div role="tabpanel">
        <ul className="nav nav-pills" role="tablist">
          <li role="presentation"><a href="#balanceTab" aria-controls="balanceTab" 
            role="tab" data-toggle="pill">Balance</a>
          </li>
          <li className="active" role="presentation"><a href="#txnsTab" aria-controls="txnsTab" 
            role="tab" data-toggle="pill">Transactions</a>
          </li>
          <li role="presentation"><a href="#xfersTab" aria-controls="xfersTab" 
            role="tab" data-toggle="pill">Transfers</a>
          </li>
          <li role="presentation"><a href="#buyTab" 
            aria-controls="buyTab" role="tab" data-toggle="pill">
            Buy</a>
          </li>
          <li role="presentation"><a href="#sellTab" 
            aria-controls="sellTab" role="tab" data-toggle="pill">
            Sell</a>
          </li>
          <li role="presentation"><a href="#sendTab" 
            aria-controls="sendTab" role="tab" data-toggle="pill">
            Send Money</a>
          </li>
          <li role="presentation"><a href="#requestTab" 
            aria-controls="requestTab" role="tab" data-toggle="pill">
            Request Money</a>
          </li>
          <li role="presentation"><a href="#transferMoneyTab" 
            aria-controls="transferMoneyTab" role="tab" data-toggle="pill">
            Transfer Money</a>
          </li>
        </ul>
      <div className="tab-content">
        <div role="tabpanel" className="tab-pane fade" id="balanceTab">
          <AccountBal key={this.props.mykey} mykey={this.props.mykey}/>
        </div>
        <div role="tabpanel" className="tab-pane fade active" id="txnsTab">
          <TxnList key={this.props.mykey} mykey={this.props.mykey}/>
        </div>
        <div role="tabpanel" className="tab-pane fade" id="xfersTab">
          <XFerList key={this.props.mykey} mykey={this.props.mykey}/>
        </div>
        <div role="tabpanel" className="tab-pane fade" id="buyTab">
          <div id="buyPage"/>
        </div>
        <div role="tabpanel" className="tab-pane fade" id="sellTab">
          <div id="sellPage"/>
        </div>
        <div role="tabpanel" className="tab-pane fade" id="sendTab">
          /*  add a 'to', 'amount', and 'note' field form */
          <div id="sendPage"/>
        </div>
        <div role="tabpanel" className="tab-pane fade" id="requestTab">
          /*  add a 'from', 'amount', and 'note' field form */
          <div id="requestPage"/>
        </div>
        <div role="tabpanel" className="tab-pane fade" id="transferMoneyTab">
          /*  add a 'to', 'amount', and 'note' field form */
          <div id="transferMoneyPage"/>
        </div>
      </div>
    </div>
    );
  }
});

