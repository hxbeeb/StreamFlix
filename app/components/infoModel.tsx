import React from 'react';
import { useCallback,useEffect,useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import FavoriteButton from './FavoriteButton';
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModel';
import useMovie from '@/hooks/useMovie';
interface InfoModalProps {
    visible?: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    const { movieId } = useInfoModal();
    const { data = {} } = useMovie(movieId);

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 realtive flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-96">
                       
                            <video
                                className="w-full brightness-[60%] h-full object-cover"
                                poster={data?.thumbnailUrl}
                                src={data?.videoUrl}
                                autoPlay
                                muted
                                loop
                            ></video>
                            <div className="absolute top-3 right-3 bg-black w-10 h-10 p-1 rounded-full  flex items-center justify-center cursor-pointer">
                                <AiOutlineClose className="text-white" size={20} onClick={handleClose} />
                            </div>
                       
                    
                                <div className="absolute bottom-[10%] left-10">
                                    <p className="text-white text-3xl md:text-4xl h-9 font-bold my-4">
                                        {data?.title}
                                    </p>
                                 
                                        
                                 
                                    <div className="flex flex-row items-center gap-3">
                                    <PlayButton movieId={data?.id} />
                                    <FavoriteButton movieId={data?.id} />
                                </div>
                                </div>
                                
                            </div>
                            <div className="px-12 py-8">
                                <p className="text-green-400 font-semibold text-md">
                                    New
                                </p>
                                <p className="text-white text-lg">
                                    {data?.duration}
                                </p>
                                <p className="text-white text-sm md:text-lg font-light">
                                            {data?.genre}
                                        </p>
                                        <p className="text-white text-sm md:text-lg font-light">
                                            {data?.description}
                                        </p>
                            </div>
                        
                </div>
            </div>
        </div>
    );
};

export default InfoModal;

