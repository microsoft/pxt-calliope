# 42 2 Oracle


## Task @showdialog
Will we win the next field hockey tournament, is Flynn in love with me or do I get to play on the computer tonight? <br>
Build your own **Calliope mini oracle** and let it give you the answers.
You program and determine the answers!

## Define input
Select the block ``||input.if shaken|||`` as input.

## Create random variable
Create a ``||variables.variable||`` and name it random.


```
```
![](https://calliope.cc/tutorials/variable_zufall.png)

## Generate and save a random number
Use the ``||math.pick random number||`` block to determine a random number between 1 and 3.
Save this to the variable ``||variables.set random|||`` using the ``|variables.set random||`` block.

## Query conditions
Query the random number using an ``||logic.if/then||`` statement. Use the ``||logic.compare (=)||`` block to compare the value of the variable ``||variables.random||`` with the possible numbers. You need one query for each possible number.<p>
**Tip:** You can also use a multi-branch if you click on the **+** in the query and expand it.


## Define output
Each possible number is assigned an answer. The random number determines the answer. Use the ``||basic.show text||`` block to display the answer on the LED matrix.

## Done! 😍
Click on ``|Download|`` to transfer your program to your Calliope mini.

```template
//
```



















