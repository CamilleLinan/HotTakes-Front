import imgBanner from '../../styles/img/hottakes-banner.jpg'

const Banner = () => {
    return(
        <div className='banner'>
            <img src={imgBanner} alt='hottakes-banner' className='banner_img' />
        </div>
    )
}

export default Banner