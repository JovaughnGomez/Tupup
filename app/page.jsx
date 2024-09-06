import styles from "./home.module.css";
import ImageSlider from "./components/ImageSlider";
import Border from "./components/Border";
import ProductDisplay from "@/app/components/ProductDisplay"
import ProductSlider from "@/app/components/ProductSlider"
import giftcards from '@/data/giftcards.json'
import topups from '@/data/topups.json'

export default function Home() {
  return (
    <Border classes={`mt-5 mb-5 ${styles.heroBackground}`} margin="mt-24">
      <ImageSlider />
      <div id='tips' className={styles.tips_wrp}>
        <h2>How {process.env.NEXT_PUBLIC_WEBSITE_NAME} Works.</h2>
        <ul className={styles.steps_wrp}>
          <li className={styles.step}>
            <div className={styles.number}><p>1</p></div>
            <p id='stepOne' className={styles.step_text}>Add money to your wallet using Digicel or Bmobile phone cards.</p>
          </li>
          <li className={styles.step}>
            <div className={styles.number}><p>2</p></div>
            <p className={styles.step_text}>Choose the product you'd like to purchase and follow the instructions provided.</p>
          </li>
          <li className={styles.step}>
            <div className={styles.number}><p>3</p></div>
            <p className={styles.step_text}>Enjoy your product!</p>
          </li>
        </ul>
      </div>
      <ProductSlider>
        <ProductDisplay name={"Popular Game Card"} id={"popular-cards"} products={giftcards} seeMorePath="/card"/>
        <ProductDisplay name={"Popular Game Top-Up"} id={"popular-topups"} products = {topups} seeMorePath="/top-up"/>
      </ProductSlider>
    </Border>
  );
}
