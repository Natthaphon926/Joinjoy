import React from 'react'
import ActivityCard from '../../components/user/ActivityCard'
import ImageSlider from '../../components/user/ImageSlider'

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <p className="text-[#3C5D9C] font-bold text-[40px]">
        งานอาสา <span className="text-[#7DB5E3]">ประกาศล่าสุด</span>
      </p>
      <ActivityCard />
    </div>
  )
}

export default Home
