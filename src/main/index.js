import './index.css';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTIme from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTIme);

function MainPage() {
    const [products, setProducts] = React.useState([]);
    React.useEffect(function () {
        axios
            .get(
                //"https://01350041-ed6a-4295-ac30-775d05994da8.mock.pstmn.io/products"
                'http://localhost:8080/products'
            )
            .then(function (result) {
                const products = result.data.products;
                setProducts(products);
                console.log(result);
            })
            .catch(function (error) {
                console.error('에러발생 : ', error);
            });
    }, []);

    return (
        <div>
            <div id="banner">
                <img src="images/banners/banner1.png" />
            </div>
            <h1>판매되는 상품들</h1>
            <div id="product-list">
                {products.map(function (product, index) {
                    return (
                        <div className="product-card">
                            <Link
                                style={{ color: 'inherit' }}
                                className="product-link"
                                to={`/products/${product.id}`}
                            >
                                <div>
                                    <img
                                        className="product-img"
                                        src={product.imageUrl}
                                    />
                                </div>
                                <div className="product-contents">
                                    <span className="product-name">
                                        {product.name}
                                    </span>
                                    <span className="product-price">
                                        {product.price}원
                                    </span>
                                    <div className="product-footer">
                                        <div className="product-seller">
                                            <img
                                                className="product-avatar"
                                                src="images/icons/avatar.png"
                                            />
                                            <span>{product.seller}</span>
                                        </div>
                                        <div>
                                            <span className="product-date">
                                                {dayjs(
                                                    product.createdAt
                                                ).fromNow()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainPage;
