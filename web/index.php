<?php
    require __DIR__ . "/../src/model.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>DressCode</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link href="/css/styles.css" rel="stylesheet">
</head>
<body>
	<div class="container">
	<div class="main-wrapper">
    <ul class="product-list row justify-content-around justify-content-lg-between align-items-stretch">
        <?php foreach (getItems(1, 4) as $item): ?>
            <li class="product col-auto row">
            	<div class="product-info col-12">
                <a href="/" class="product-img row align-items-center">
                	<img class="col-auto" src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>">
                	<?php if ($item['discountCost'] !== null): ?>
						<span class="label-sale">Sale</span>
					<?php endif; ?>
					<?php if ($item['new']): ?>
						<span class="label-new">New</span>
					<?php endif; ?>
                </a>
                <h4><?php echo $item['title']; ?></h4>
                <p><?php echo $item['description']; ?></p>
                <span class="price-new">$<?php echo $item['discountCost'] ? $item['discountCost'] : $item['cost']; ?></span>
                <?php if ($item['discountCost'] !== null): ?>
                    <span class="price-old">$<?php echo $item['cost']; ?></span>
                <?php endif; ?>
                </div>
                <div class="btn-area row justify-content-between align-self-end col-12">
                	<a class="btn btn-premium " href="/">Add to cart</a>
                	<a class="btn btn-secondary col-6" href="/">View</a>
                </div>
            </li>
        <?php endforeach; ?>
    </ul>
    <div class="action-area">
        <button class="btn btn-premium btn-load">Load more</button>
        <div class="preloader d-none">
			<span class="spinner-grow text-primary"></span>
          	<span class="spinner-grow text-primary"></span>
          	<span class="spinner-grow text-primary"></span>
		</div>
    </div>
    <footer class="footer row justify-content-around justify-content-lg-between align-items-stretch">
    	<div class="col-12 col-md-10 col-lg-4">
    		<div class="f-block">
				<h3>Hot offers</h3>
				<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit magna, hend.</p>
				<ul class="basic">
					<li>Vestibulum ante ipsum primis in faucibus orci luctus</li>
					<li>Nam elit magna hendrerit sit amet tincidunt ac</li>
					<li>Quisque diam lorem interdum vitae dapibus ac scele</li>
					<li>Donec eget tellus non erat lacinia fermentum</li>
					<li>Donec in velit vel ipsum auctor pulvin</li>
  				</ul>
        	</div>
        </div>
		<div class="col-12 col-md-10 col-lg-4">
			<div class="f-block">
				<h3>Hot offers</h3>
				<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit magna, hend.</p>
				<ul class="basic">
					<li>Vestibulum ante ipsum primis in faucibus orci luctus</li>
					<li>Nam elit magna hendrerit sit amet tincidunt ac</li>
					<li>Quisque diam lorem interdum vitae dapibus ac scele</li>
					<li>Donec eget tellus non erat lacinia fermentum</li>
        			<li>Donec in velit vel ipsum auctor pulvin</li>
          		</ul>
			</div>
		</div>
		<div class="col-12 col-md-10 col-lg-4">
			<div class="f-block">
				<h3>Store information</h3>
				<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit magna, hend.</p>
				<ul class="ic-list">
					<li><i class="fas fa-map-marker-alt"></i><span>Company Inc., 8901 Marmora Road, Glasgow, D04 89GR</span></li>
					<li><i class="fas fa-phone"></i><span>Call us now toll free: (800) 2345-6789</span></li>
					<li><i class="far fa-envelope"></i><span>Customer support: support@example.com<br>Press: pressroom@example.com</span></li>
					<li><i class="fab fa-skype"></i><span>Skype: sample-username</span></li>
          		</ul>
			</div>
		</div>
    </footer>
    </div>
    </div>
    <script type="text/javascript" async defer src="/js/main.js"></script>
</body>
</html>
