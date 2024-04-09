
import { createSignal } from 'solid-js';
import {Button, Modal, Input} from "@jundao/design";

const PlanningPage = () => {
    const [isPopupOpen, setIsPopupOpen] = createSignal(false);

    return (
      <div>
        <h1>Page planning</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia ratione aliquam assumenda atque, ducimus odit ex voluptas illo obcaecati alias, delectus nulla minus cupiditate voluptates pariatur sit, labore ab corporis.</p>
        
        <Button onClick={() => setIsPopupOpen(true)}>Publier une annonce</Button>
        {/* Le reste de votre page */}
        <Modal open={isPopupOpen()} onOpenChange={setIsPopupOpen} title={"Publier annonce"}>
          <Input type="text"/>
        </Modal>
      </div>
    );
};
  
export default PlanningPage;
