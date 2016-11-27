#!/usr/bin/bash
# Usage:
#  ./get-psi-score.sh https://example.com

function addSeperator() {

	echo -e "\n" >> scores.txt;
}


echo -e "FEND Project PSI scores" >> scores.txt;


addSeperator;

psi $1 >> scores.txt;

addSeperator;

psi $1/project-2048 >> scores.txt
