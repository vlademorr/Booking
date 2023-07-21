import type { Metadata } from 'next'
import { SearchBar } from "@/Components/SearchBar"

export const metadata: Metadata = {
    title: "Booking",
    description: "Here you can book the best accommodation for any date for your travels",
}

export default function Home() {
    return (
        <div className="home-layout">
            <SearchBar />
        </div>
    )
}
