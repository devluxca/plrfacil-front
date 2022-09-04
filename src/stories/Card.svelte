<div class="card-container">
	<slot></slot>
</div>

<style>
*{
	box-sizing: border-box;
}
	
.card-container {
	background-color: hsla(0, 0%, 100%, 0.753);
	border-radius: 6px;
	box-shadow:10px 0px 66px -10px rgb(0 0 0);
	color: #B3B8CD;
	padding: 30px 0 30px 0;
	position: relative;
	width: 350px;
	max-width: 100%;
	text-align: center;
}
</style>