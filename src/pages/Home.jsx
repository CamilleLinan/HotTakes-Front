import Banner from "../components/Layout/Banner"
import DisplaySauces from "../components/Home/DisplaySauces"
import Header from "../components/Layout/Header"
import Footer from "../components/Layout/Footer"

const Home = () => {
    return(
        <>
            <Header />
            <Banner />
            <DisplaySauces />
            <Footer />
        </>
    )
}

export default Home