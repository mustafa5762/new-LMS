import React from 'react'
import Card from '@/components/ui/Card';
import RichTextEditor from '@/components/shared/RichTextEditor'
import Button from '@/components/ui/Button'

function Rules() {
  return (
    <div>
        <h2>Rules & Regulations</h2>
        <p className='mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, sed.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            <Card>
                <h5>Update Rules & Regulations</h5>
                <div className="mt-6">
                    <RichTextEditor/>
                </div>
                {/* Submit Button */}
                <div className="mt-6">
                    <Button variant="twoTone" className="w-full">
                        Update Rules
                    </Button>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default Rules