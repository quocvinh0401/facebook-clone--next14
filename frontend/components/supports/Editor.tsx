interface Props {
  value: string;
  setValue: (value: string) => void;
}

const Editor = ({ value, setValue }: Props) => {
  return (
    <div>
      <textarea
        placeholder="What's on your mind"
        rows={5}
        className="w-full resize-none outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};
export default Editor;
