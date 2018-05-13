<?php 
session_start();
$connect = mysqli_connect("localhost", "root", "", "testing");

if(isset($_POST["add_to_cart"]))
{
    $item_id = $_GET["id"];
    if(isset($_SESSION["shopping_cart"]))
    {
        $item_array_id = array_column($_SESSION["shopping_cart"], "item_id");
        if(!in_array($item_id, $item_array_id))
        {
            $item_array = array(
                'item_id'			=>	$item_id,
                'item_name'			=>	$_POST["hidden_name"],
                'item_price'		=>	$_POST["hidden_price"],
            );
            $_SESSION["shopping_cart"][$item_id] = $item_array;
        }
        else
        {
            echo '<script>alert("Item Already Added")</script>';
        }
    }
    else
    {
        $item_array = array(
            'item_id'			=>	$item_id,
            'item_name'			=>	$_POST["hidden_name"],
            'item_price'		=>	$_POST["hidden_price"],
        );
        $_SESSION["shopping_cart"][$item_id] = $item_array;
    }
    echo '<script>window.location="index.php"</script>';
}

if(isset($_GET["action"]))
{
    if($_GET["action"] == "delete")
    {
        foreach($_SESSION["shopping_cart"] as $keys => $values)
        {
            if($values["item_id"] == $_GET["id"])
            {
                unset($_SESSION["shopping_cart"][$keys]);
                echo '<script>alert("Item Removed")</script>';
                echo '<script>window.location="index.php"</script>';
            }
        }
    }

    if($_GET["action"] == "buy")
    {
        try {
            $total = $_GET["price"];
            mysqli_begin_transaction($connect);
            $stmt = mysqli_prepare($connect, "DELETE FROM tbl_product where id = ?");
            $stmt->bind_param("i", $product_id);
            foreach ($_SESSION["shopping_cart"] as $key => $value) {
                $product_id = $value["item_id"];
                $rows = $stmt->execute();
                if ($connect->affected_rows == 0) {
                    echo '<script>alert("Nie ma tego towaru ' . $value["item_name"] . '")</script>';
                    $total = $total - $value["item_price"];
                    //echo '<script>window.location="index.php"</script>';
                    //return;
                }
            }
            mysqli_commit($connect);
            unset($_SESSION["shopping_cart"]);
            echo '<script>alert("Udany zakup za ' . $total . '")</script>';
            echo '<script>window.location="index.php"</script>';
        } catch (Exception $e) {
            echo '<script>alert("Error - buy")</script>';
            echo '<script>window.location="index.php"</script>';
        }
    }
}

?>
<!DOCTYPE html>
<html>
    <head>
        <title>My shop</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    </head>
    <body>
        <br />
        <div class="container">
            <br />
            <br />
            <h3 align="center">Mysql Shopping Cart</h3><br />
            <br /><br />
            <?php
                $query = "SELECT * FROM tbl_product ORDER BY id ASC";
                $result = mysqli_query($connect, $query);
                if(mysqli_num_rows($result) > 0)
                {
                    while($row = mysqli_fetch_array($result))
                    {
                ?>
            <div class="col-md-4">
                <form method="post" action="index.php?action=add&id=<?php echo $row["id"]; ?>">
                    <div style="border:1px solid #333; background-color:#f1f1f1; border-radius:5px; padding:16px;" align="center">
                        <img src="images/<?php echo $row["image"]; ?>" class="img-responsive" /><br />

                        <h4 class="text-info"><?php echo $row["name"]; ?></h4>

                        <h4 class="text-danger">$ <?php echo $row["price"]; ?></h4>

                        <input type="hidden" name="hidden_name" value="<?php echo $row["name"]; ?>" />

                        <input type="hidden" name="hidden_price" value="<?php echo $row["price"]; ?>" />

                        <input type="submit" name="add_to_cart" style="margin-top:5px;" class="btn btn-success" value="Add to Cart" />

                    </div>
                </form>
            </div>
            <?php
                    }
                }
            ?>
            <div style="clear:both"></div>
            <br />
            <h3>Order Details</h3>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <tr>
                        <th width="50%">Item Name</th>
                        <th width="30%">Price</th>
                        <th width="20%">Action</th>
                    </tr>
                    <?php
                    if(!empty($_SESSION["shopping_cart"]))
                    {
                        $total = 0;
                        foreach($_SESSION["shopping_cart"] as $keys => $values)
                        {
                    ?>
                    <tr>
                        <td><?php echo $values["item_name"]; ?></td>
                        <td>$ <?php echo $values["item_price"]; ?></td>
                        <td><a href="index.php?action=delete&id=<?php echo $values["item_id"]; ?>"><span class="text-danger">Remove</span></a></td>
                    </tr>
                    <?php
                            $total = $total + $values["item_price"];
                        }
                    ?>
                    <tr>
                        <td align="right">Total</td>
                        <td align="right">$ <?php echo number_format($total, 2); ?></td>
                        <td><a href="index.php?action=buy&price=<?php echo $total; ?>"><span class="text-danger">BUY ALL</span></a></td>
                    </tr>
                    <?php
                    }
                    ?>
                        
                </table>
            </div>
        </div>
    <br />
    </body>
</html>