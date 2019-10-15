App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const passManager = await $.getJSON('PasswordManager.json')
    App.contracts.PassManager = TruffleContract(passManager)
    App.contracts.PassManager.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.passManager = await App.contracts.PassManager.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Task Manager
    await App.renderManager()

    // Update loading state
    App.setLoading(false)
  },

  renderManager: async () => {
    App.setLoading(true)
    const owner = await App.passManager.users(App.account)
    App.setLoading(false)

    if (owner[2]) {
      App.owner = owner
      App.name =  owner[0].toString()
      App.checkHash =  owner[3].toString()
      App.passwordCount =  owner[1].toNumber()
      App.loginUserView()
    } else {
      App.signupUserView()
    }
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },

  loginUserView: () => {
    const loginTem = Handlebars.templates.login({"name" : App.name})
    App.hideAll()
    $("#login-form").show()
    $("#login-form").html(loginTem)
    $("#login-button").click(App.loginUser)
  },

  signupUserView: () => {
    const signupTem = Handlebars.templates.signup()
    App.hideAll()
    $("#signup-form").show()
    $("#signup-form").html(signupTem)
    $("#signup-button").click((e) => App.signupUser(e))
  },

  loginUser: async () => {
    App.setLoading(true)
    const pass = $('#login-password').val()

    if (CryptoJS.SHA256(pass).toString() == App.checkHash) {
      await App.showPasswordList()
    } else {
      alert("Master Password doesn't match")
    }
    App.setLoading(false)
  },

  signupUser: async (e) => {
    App.setLoading(true)
    e.preventDefault()
    const name = $('#signup-name').val().toString()
    const pass = $('#signup-password').val().toString()
    const passhash = CryptoJS.SHA256(pass).toString()
    console.log(name)
    console.log(passhash)

    await App.passManager.addUser(name, passhash)
    App.setLoading(false)
    window.location.reload()

  },

  hideAll: () => {
    $("#my-error").hide()
    $("#loader").hide()
    $("#login-form").hide()
    $("#signup-form").hide()
    $("#password-list").hide()
  },

  showPasswordList: async () => {
    App.hideAll()
    $("#password-list").show()
    var passtable = []
    var k = 0
    for (var i = 1; i <= App.passwordCount; i++) {
      const password = await App.passManager.passwords(App.account, i)
      console.log(password);
      if(password[2]) {
        passtable.push({
          "index" : k,
          "number" : i,
          "password" : password[0].toString(),
          "title" : password[1].toString()
        })
        k++
      }
    }
    App.passtable = passtable
    const passlistTem = Handlebars.templates.passwords({"passtable" : passtable})
    $("#password-list").show()

    $("#password-list").html(passlistTem)
    $("#passFormEntry").hide()

    $("#add-pass-button").click(App.addPasswordForm)
    $("#logout-pass-button").click(() => { App.renderManager() })
  },

  addPasswordForm: (e) => {
    e.preventDefault()
    $("#dash-jumbo").hide()
    const passForm = Handlebars.templates.addpass()
    $("#passFormEntry").show()
    $("#passFormEntry").html(passForm)
    $("#save-pass-button").click((e) => App.addPassword(e))
    $("#cancel-pass-button").click(() => {
      $("#passFormEntry").hide()
      $("#dash-jumbo").show()
    })
  },

  addPassword: async (e) => {
    App.setLoading(true)
    e.preventDefault()
    const pass = $('#add-pass-password').val().toString()
    const title = $('#add-pass-title').val().toString()
    const master = $('#add-pass-master').val().toString()
    if (CryptoJS.SHA256(master).toString() == App.checkHash) {

      const enc_pass = CryptoJS.AES.encrypt(pass, master).toString()
      console.log(CryptoJS.AES.decrypt(enc_pass.toString(), master).toString(CryptoJS.enc.Utf8))
      await App.passManager.addPassword(enc_pass, title)
      App.passwordCount++
      await App.showPasswordList()
      $("#passFormEntry").hide()
      $("#dash-jumbo").show()
    } else {
      alert("Master Password doesn't match")
    }
    App.setLoading(false)
  },

  showPasswordPopUp: (index) => {
    const passitem = App.passtable[index]
    const modalForm = Handlebars.templates.modal(passitem)
    $("#modal-mine").html(modalForm)
    $("#new-title").hide()
    $("#new-pass").hide()
    $("#delete-warning").hide()

    $("#delete-pass-button").click(async () => {
      console.log("delete");
      App.setLoading(true)
      if($("#delete-pass-button").html() == "Delete Password") {
        $("#delete-warning").show()
        $("#delete-pass-button").html("Confirm Delete")
      } else if($("#delete-pass-button").html() == "Confirm Delete"){
        $("#exampleModalCenter").modal("hide")
        await App.passManager.deletePassword(passitem["number"])
        await App.showPasswordList()
      }
      App.setLoading(false)
    })
    // change button handler
    $("#change-pass-button").click(async () => {
      App.setLoading(true)
      if($("#change-pass-button").html() == "Change Password") {
        $("#new-title").show()
        $("#new-pass").show()
        $("#change-pass-button").html("Confirm Password")
      } else if($("#change-pass-button").html() == "Confirm Password") {
        var new_pass = $('#new-pass-password').val().toString()
        var new_title = $('#new-pass-title').val().toString()
        const master = $('#modal-master').val().toString()

        if (CryptoJS.SHA256(master).toString() == App.checkHash) {
          console.log(new_pass);
          console.log(new_title);
          if(new_pass == "" || new_title == "") {
            alert("Empty password or title")
          } else {
            const enc_pass = CryptoJS.AES.encrypt(new_pass, master).toString()
            $("#exampleModalCenter").modal("hide")
            await App.passManager.changePassword(passitem["number"], enc_pass, new_title)
            await App.showPasswordList()
          }
        } else {
          alert("Master Password doesn't match")
        }
        $("#new-title").hide()
        $("#new-pass").hide()
        $("#change-pass-button").html("Change Password")
      }
      App.setLoading(false)
    })
    // show password handler
    $("#modal-decrypt").click(() => {
      if ($("#pass-decrypt").text() != "") {
        $("#pass-decrypt").text("")
        $("#modal-decrypt").html("Show Password")
      } else {
        const master = $('#modal-master').val().toString()
        if (CryptoJS.SHA256(master).toString() == App.checkHash) {
          const decrypted = CryptoJS.AES.decrypt(passitem["password"], master).toString(CryptoJS.enc.Utf8)
          $("#pass-decrypt").text(decrypted)
          $("#modal-decrypt").html("Hide Password")
        } else {
          alert("Master Password doesn't match")
        }
      }
    })
    $("#exampleModalCenter").modal()

  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})

//
