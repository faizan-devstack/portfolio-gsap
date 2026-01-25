'use client'

import { useEffect, useState } from 'react'

export default function LiveTimePKT() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      const pkTime = new Intl.DateTimeFormat('en-PK', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)

      setTime(pkTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-end">
      <span className="menu-social text-sm text-foreground">Islamabad, PK</span>
      <span className="menu-social text-fade-text font-mono text-sm md:text-base">
        {time}
      </span>
    </div>
  )
}
