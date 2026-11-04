import { CornerFrame } from "@/components/shared/corner-frame"
import { Panel } from "@/components/shared/panel"
import { Button } from "@/components/ui/button"

function SaleActionCard() {
  return (
    <Panel variant="card" data-slot="sale-action-card" className="px-[17px] pt-[15px] pb-4">
      <h2 className="text-[13px] uppercase">Lorem ipsum</h2>
      <p className="mt-0.5 text-[13px] text-foreground/75">
        Lorem ipsum dolor sit amet consectetur adipiscing
      </p>

      <CornerFrame
        variant="cross"
        cornerSize={12}
        cornerHeight={15}
        className="mx-1.5 mt-[30px]"
      >
        <Button size="lg" className="w-full">
          Lorem ipsum
        </Button>
      </CornerFrame>

      <CornerFrame
        cornerSize={6}
        cornerHeight={7.5}
        offset={5}
        className="mx-[5px] mt-[25px]"
      >
        <Button
          size="lg"
          variant="outline"
          className="w-full border-primary bg-transparent"
        >
          Lorem ipsum
        </Button>
      </CornerFrame>

      <p className="mt-[15px] text-center text-[11px] text-foreground/85">
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
      </p>
    </Panel>
  )
}

export { SaleActionCard }
