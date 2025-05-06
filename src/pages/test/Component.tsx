import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import Input from "../../components/ui/Input";
import styles from "./Component.module.css";

export default function Component() {

  return (
    <div className={styles.componentBox}>
      <h1 className={styles.title}>
        Input 컴포넌트
      </h1>
      <div className={styles.box}>
        <Input
          placeholder="Placeholder"
        />
      </div>
      <div className={styles.box}>
        <Input
          placeholder="Placeholder"
          disabled
        />
      </div>
      <div className={styles.box}>
        <Input
          placeholder="Placeholder"
          error="Error Message"
        />
      </div>
      <h1 className={styles.title}>
        Dropdown 컴포넌트
      </h1>
      <div className={styles.box}>
        <Dropdown
          label="선택"
          option={["옵션1", "옵션2", "옵션3"]}
        />
      </div>
      <div className={styles.box}>
        <Dropdown
          label="선택"
          disabled
        />
      </div>
      <div className={styles.box}>
        <Dropdown
          label="선택"
          error="Error Message"
          option={["옵션1", "옵션2", "옵션3"]}
        />
      </div>
      <h1 className={styles.title}>
        Button 컴포넌트
      </h1>
      <div className={styles.box}>
        <Button
          text="버튼"
          variant="primary"
        />
      </div>
      <div className={styles.box}>
        <Button
          text="버튼"
          variant="primary"
          disabled
        />
      </div>
      <div className={styles.box}>
        <Button
          text="버튼"
          variant="secondary"
        />
      </div>
      <div className={styles.box}>
        <Button
          text="버튼"
          variant="secondary"
          disabled
        />
      </div>
    </div>
  )

}