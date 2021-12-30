App={
    loading:false,
    contracts:{},
    load: async()=>{
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider
          web3 = new Web3(web3.currentProvider)
        } else {
          window.alert("Please connect to Metamask.");
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
      loadAccount:async ()=>{
          App.account=web3.eth.accounts[0];
          console.log(App.account);
      },
      
      loadContract:async ()=>{
        console.log('loadcontract start');
          const election= await $.getJSON('./Election.json')
          App.contracts.Election= TruffleContract(election)
          App.contracts.Election.setProvider(App.web3Provider)
          App.election= await App.contracts.Election.deployed()
        console.log('loadcontract end');

      },
      render: async ()=>{
        console.log('render start');

          //prevent double rendering 
          if (App.loading){
              return;
          }
        App.setLoading(true)
          await App.renderCandidates();
        App.setLoading(false)
        console.log('render end');

      },

      renderCandidates:async()=>{
          //Load the TotalCandidateCount from the blockchain
          const TotalCandidates=await App.election.TotalCandidates()
          const $candidateresult=$('#candidatesResults')
          const $candidateTemplate=$('.row')
          const $candidatesSelect=$('#candidatesSelect');
          //Render out each Candidate with new template

          for(var i=1;i<=TotalCandidates;i++)
          {
              //fetch the candidate data
             const candidate=await App.election.candidates(i)
             const candidateID=candidate[0].toNumber()

             const candidateName=candidate[1]
             const PartyName=candidate[2]
             const VoteCount=candidate[3].toNumber()

             //create the html for candidate
             const newCandidateTemplate= $candidateTemplate.clone()
             $newCandidateTemplate=`<tr><th>${candidateID}</th><td>${candidateName}</td><td>${PartyName}</td><td>${VoteCount}</td></tr>`;
            $candidateresult.append($newCandidateTemplate)

            //render candidaete ballot option;
            var candidateOption = `<option value="${candidateID}"> ${candidateName} (${PartyName}) </option>`
            $candidatesSelect.append(candidateOption);
          }
           // show the Candidates
      },
      castVote:()=>{
        var candidateID=$('#candidatesSelect').val();
        App.contracts.Election.deployed().then(function(instance){
            return instance.vote(candidateID,{from:App.account});
        }).then(function(result){
            $('#content').hide();
            $('#loader').show();
            alert("thanks for voting");
            window.location.reload();
            renderCandidates();
        }).catch(function(err){
            console.error(err);
        })
      },
      setLoading: (boolean)=>{
          App.loading=boolean
          const loader= $('#loader')
          const content=$('#content')
          if(boolean){
              loader.show()
              content.hide()
          }
          else{
              loader.hide()
              content.show()
          }
      }
}

$(()=>{
    $(window).load(()=>{
        App.load();
    })
})