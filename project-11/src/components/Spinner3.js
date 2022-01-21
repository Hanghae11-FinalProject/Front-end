import React from 'react';
import styled from 'styled-components';

const Spinner3 = () => {
    return (
        <Wrap>
     <div id="escapingBallG">
	<div id="escapingBall_1" class="escapingBallG"></div>
</div>
        </Wrap>
    );
};

export default Spinner3;
const Wrap = styled.div`
#escapingBallG{
	position:relative;
	width:125px;
	height:43px;
	margin:auto;
}

.escapingBallG{
	background-color:rgb(0,0,0);
	position:absolute;
	top:0;
	left:0;
	width:43px;
	height:43px;
	border-radius:21px;
		-o-border-radius:21px;
		-ms-border-radius:21px;
		-webkit-border-radius:21px;
		-moz-border-radius:21px;
	animation-name:bounce_escapingBallG;
		-o-animation-name:bounce_escapingBallG;
		-ms-animation-name:bounce_escapingBallG;
		-webkit-animation-name:bounce_escapingBallG;
		-moz-animation-name:bounce_escapingBallG;
	animation-duration:1.5s;
		-o-animation-duration:1.5s;
		-ms-animation-duration:1.5s;
		-webkit-animation-duration:1.5s;
		-moz-animation-duration:1.5s;
	animation-iteration-count:infinite;
		-o-animation-iteration-count:infinite;
		-ms-animation-iteration-count:infinite;
		-webkit-animation-iteration-count:infinite;
		-moz-animation-iteration-count:infinite;
	animation-timing-function:linear;
		-o-animation-timing-function:linear;
		-ms-animation-timing-function:linear;
		-webkit-animation-timing-function:linear;
		-moz-animation-timing-function:linear;
	animation-delay:0s;
		-o-animation-delay:0s;
		-ms-animation-delay:0s;
		-webkit-animation-delay:0s;
		-moz-animation-delay:0s;
	transform:scale(0.5, 1);
		-o-transform:scale(0.5, 1);
		-ms-transform:scale(0.5, 1);
		-webkit-transform:scale(0.5, 1);
		-moz-transform:scale(0.5, 1);
}



@keyframes bounce_escapingBallG{
	0%{
		left:0px;
		transform:scale(0.5, 1);
	}

	25%{
		left:41px;
		transform:scale(1, 0.5);
	}

	50%{
		left:103px;
		transform:scale(0.5, 1);
	}

	75%{
		left:41px;
		transform:scale(1, 0.5);
	}

	100%{
		left:0px;
		transform:scale(0.5, 1);
	}
}

@-o-keyframes bounce_escapingBallG{
	0%{
		left:0px;
		-o-transform:scale(0.5, 1);
	}

	25%{
		left:41px;
		-o-transform:scale(1, 0.5);
	}

	50%{
		left:103px;
		-o-transform:scale(0.5, 1);
	}

	75%{
		left:41px;
		-o-transform:scale(1, 0.5);
	}

	100%{
		left:0px;
		-o-transform:scale(0.5, 1);
	}
}

@-ms-keyframes bounce_escapingBallG{
	0%{
		left:0px;
		-ms-transform:scale(0.5, 1);
	}

	25%{
		left:41px;
		-ms-transform:scale(1, 0.5);
	}

	50%{
		left:103px;
		-ms-transform:scale(0.5, 1);
	}

	75%{
		left:41px;
		-ms-transform:scale(1, 0.5);
	}

	100%{
		left:0px;
		-ms-transform:scale(0.5, 1);
	}
}

@-webkit-keyframes bounce_escapingBallG{
	0%{
		left:0px;
		-webkit-transform:scale(0.5, 1);
	}

	25%{
		left:41px;
		-webkit-transform:scale(1, 0.5);
	}

	50%{
		left:103px;
		-webkit-transform:scale(0.5, 1);
	}

	75%{
		left:41px;
		-webkit-transform:scale(1, 0.5);
	}

	100%{
		left:0px;
		-webkit-transform:scale(0.5, 1);
	}
}

@-moz-keyframes bounce_escapingBallG{
	0%{
		left:0px;
		-moz-transform:scale(0.5, 1);
	}

	25%{
		left:41px;
		-moz-transform:scale(1, 0.5);
	}

	50%{
		left:103px;
		-moz-transform:scale(0.5, 1);
	}

	75%{
		left:41px;
		-moz-transform:scale(1, 0.5);
	}

	100%{
		left:0px;
		-moz-transform:scale(0.5, 1);
	}
}
`