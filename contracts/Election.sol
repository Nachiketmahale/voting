pragma solidity ^0.5.0;
contract Election{
    
    struct Candidate{
        uint id;
        string CandidateName;
        string PartyName;
        uint VoteCount;
    }

    struct Voter{
        string voterId;
        bool authorized;
        bool voted;
        uint vote;
    }
    
    uint public TotalCandidates=0;
    uint public TotalVotes=0;
    uint public TotalRecords=0;

    mapping(address=>Voter) public voters;
    mapping(uint =>Candidate) public candidates;
    
    constructor() public{
        addCandidates("Rohit Patil","RJC");
        addCandidates("Nachiket Mahale","GPM");
    }
    
    // function authorize_voter(string memory _VtrID,string memory AdrID,string memory mblNo,string memory emlID) public{
    //     for(uint i=0;i<=TotalRecords;i++)
    //     {
    //         if(Voter_ID[i]==_VtrID && AdharCard[i]==AdrID && mobileNo[i]==mblNo && emailID[i]==emlID) 
    //         {
    //             found=true;
    //         }
    //     }
    // }
    // function advacedvalidation(string memory _ID) public returns (bool){
    //     for(uint i=0;i<=TotalVotes;i++)
    //     {
    //         if(VotedList[i]== _ID)
    //         {
    //             return false;
    //         }
    //         return true;
    //     }
    // }
    function addCandidates(string memory name,string memory party) private{
        TotalCandidates++;
        candidates[TotalCandidates]=Candidate(TotalCandidates,name,party,0);
    }
    function vote(uint _candidateId) public {
        // require(found);
        require(!voters[msg.sender].voted);
        // require(advacedvalidation(voters[msg.sender].voterId));
        candidates[_candidateId].VoteCount++;
        // VotedList.push(voters[msg.sender].VoterID);
        voters[msg.sender].voted=true;
    }
    // function addRecord(string memory vtrId,string memory AdrID,string memory mblNo,string memory emlId) private{
    //     Voter_ID.push(vtrId);
    //     AdharCard.push(AdrID);
    //     mobileNo.push(mblNo);
    //     emailID.push(emlId);
    //     TotalRecords++;
    // }
}