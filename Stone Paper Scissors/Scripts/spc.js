const scorecard = JSON.parse(localStorage.getItem('score'));

            document.body.addEventListener('keydown', (event) =>{
                if(event.key === 'r'){
                    playGame('Rock');
                }
                else if(event.key === 'p'){
                    playGame('Paper');
                }
                else if(event.key === 's'){
                    playGame('Scissors');
                }
                else{
                    const scoreShow = document.querySelector('.score-show');
                    scoreShow.innerHTML = 'Press a valid key!!';
                }
                
            })

            function updateTitle(){
                if(scorecard.Wins > scorecard.Losses){
                    document.title = 'Spc-Winning';
                }
                else{
                    document.title = 'Spc-Losing';
                }
            }
            updateScorecard();
            updateTitle();
            let autoPlayStatus = false;
            let autoPlayInterval = null;
            function toggleAutoplay(){
                const autoplayButton = document.querySelector('.autoPlay');
                if(autoPlayStatus){
                    autoPlayStatus = false;
                    autoplayButton.textContent = 'Autoplay';
                    clearInterval(autoPlayInterval);
                    document.querySelector('.result').innerHTML = 'Autoplay Stopped';
                    autoPlayInterval = null;
                }
                else{
                    autoPlayStatus = true;
                    autoplayButton.textContent = 'Stop Autoplay';
                    setTimeout(function autoPlay(){
                        const playerMove = computerMove();
                        playGame(playerMove);
                        updateScorecard();updateTitle;
                        },1);
                    autoPlayInterval = setInterval(function autoPlay(){
                                        const playerMove = computerMove();
                                        playGame(playerMove);
                                        updateScorecard();updateTitle;
                                        }, 1000);
                }
                //console.log(autoPlayStatus);               
            }

            function updateScorecard(){
                const scoreShow = document.querySelector('.score-show');
                scoreShow.innerHTML = `Wins: ${scorecard.Wins} Losses: ${scorecard.Losses} Ties: ${scorecard.Ties}`
                let winPercent = ((scorecard.Wins)/(scorecard.Wins+scorecard.Losses+scorecard.Ties))*100;
                const perwin = document.querySelector('.percentwin');
                perwin.innerHTML = `Percent Won: ${winPercent}`;
            }

            function computerMove(){
                const num = Math.random();
                let Move = ''
                if(num >=0 && num<1/3){
                    Move = 'Rock';
                }
                if(num>=1/3 && num<2/3){
                    Move = 'Paper';
                }
                if(num>=2/3 && num<1){
                    Move= 'Scissors';
                }
                return Move;
                
            }

            function playGame(playerMove){
                const Move = computerMove();
                let result;
                if(playerMove === 'Rock'){
                    if(Move === 'Rock'){
                        //alert('You Chose Rock.\nComputer Chose Rock\nTie.');
                        result = 'Tie';
                        scorecard.Ties +=1;
                    }
                    if(Move === 'Paper'){
                        //alert('You Chose Rock.\nComputer Chose Paper\nYou lost.');
                        scorecard.Losses +=1;
                        result = 'You Lost';
                    }
                    if(Move === 'Scissors'){
                        //alert('You Chose Rock.\nComputer Chose Scissors\nYou won.');
                        scorecard.Wins+=1;
                        result = 'You Won';
                    }
                }
                if(playerMove === 'Paper'){
                    if(Move === 'Rock'){
                        //alert('You Chose Paper.\nComputer Chose Rock\nYou Won.');
                        scorecard.Wins+=1;
                        result = 'You Won';
                    }
                    if(Move === 'Paper'){
                        //alert('You Chose Paper.\nComputer Chose Paper\nTie.');
                        scorecard.Ties +=1;
                        result = 'Tie';
                    }
                    if(Move === 'Scissors'){
                        //alert('You Chose Paper.\nComputer Chose Scissors\nYou Lost.');
                        scorecard.Losses +=1;
                        result = 'You Lost';
                    }
                }
                if(playerMove === 'Scissors'){
                    if(Move === 'Rock'){
                        //alert('You Chose Scissors.\nComputer Chose Rock\nYou Lost.');
                        scorecard.Losses +=1;
                        result = 'You Lost';
                    }
                    if(Move === 'Paper'){
                        //alert('You Chose Scissors.\nComputer Chose Paper\nYou Won.');
                        scorecard.Wins+=1;
                        result = 'You Won';
                    }
                    if(Move === 'Scissors'){
                        //alert('You Chose Scissors.\nComputer Chose Scissors\nTie.');
                        scorecard.Ties +=1;
                        result = 'Tie';
                    }
                    

                }
                //tells the move chose by player and computer.
                const resultpara = document.querySelector('.result');
                resultpara.innerHTML = `You chose ${playerMove}. Computer chose ${Move}. ${result}`;
                //saves the score
                localStorage.setItem('score',JSON.stringify(scorecard));
                //updates the scorecard
                updateScorecard();updateTitle();
            }